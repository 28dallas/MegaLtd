const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const Blog = require('../models/Blog');
const MySQLBlog = require('../models/mysql/Blog');

const router = express.Router();

// Get all blog posts with filtering and pagination
router.get('/', [
  query('category').optional().isIn(['maintenance', 'security', 'fleet', 'technology', 'audio', 'general']),
  query('status').optional().isIn(['draft', 'published', 'archived']),
  query('featured').optional().isBoolean(),
  query('search').optional().isString(),
  query('author').optional().isMongoId(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('sort').optional().isIn(['createdAt', '-createdAt', 'publishedAt', '-publishedAt', 'title'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      category,
      status = 'published',
      featured,
      search,
      author,
      page = 1,
      limit = 10,
      sort = '-publishedAt'
    } = req.query;

    // Build filter object
    const filter = { status };

    if (category) filter.category = category;
    if (featured === 'true') filter.isFeatured = true;
    if (author) filter.author = author;

    // Search functionality
    let posts;
    if (search) {
      posts = await Blog.find({
        $and: [
          filter,
          {
            $or: [
              { title: { $regex: search, $options: 'i' } },
              { content: { $regex: search, $options: 'i' } },
              { excerpt: { $regex: search, $options: 'i' } }
            ]
          }
        ]
      })
      .populate('author', 'name email')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    } else {
      posts = await Blog.find(filter)
        .populate('author', 'name email')
        .sort(sort)
        .limit(limit * 1)
        .skip((page - 1) * limit);
    }

    const total = await Blog.countDocuments(search ? {
      $and: [
        filter,
        {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } },
            { excerpt: { $regex: search, $options: 'i' } }
          ]
        }
      ]
    } : filter);

    res.json({
      posts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalPosts: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching blog posts' });
  }
});

// Get single blog post by ID
router.get('/:id', [
  param('id').isMongoId()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = await Blog.findById(req.params.id)
      .populate('author', 'name email');

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Increment view count
    await Blog.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });

    res.json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching blog post' });
  }
});

// Get blog post by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug })
      .populate('author', 'name email');

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Increment view count
    await Blog.findByIdAndUpdate(post._id, { $inc: { views: 1 } });

    res.json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching blog post' });
  }
});

// Get posts by category
router.get('/category/:category', [
  param('category').isIn(['maintenance', 'security', 'fleet', 'technology', 'audio', 'general']),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
], async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const posts = await Blog.find({ category, status: 'published' })
      .populate('author', 'name email')
      .sort('-publishedAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Blog.countDocuments({ category, status: 'published' });

    res.json({
      posts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalPosts: total
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching blog posts by category' });
  }
});

// Get featured blog posts
router.get('/featured/list', async (req, res) => {
  try {
    const posts = await Blog.find({ isFeatured: true, status: 'published' })
      .populate('author', 'name email')
      .sort('-publishedAt')
      .limit(6);

    res.json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching featured blog posts' });
  }
});

// Create new blog post (Admin/Author only)
router.post('/', [
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title is required (1-100 characters)'),
  body('excerpt').trim().isLength({ min: 10, max: 200 }).withMessage('Excerpt is required (10-200 characters)'),
  body('content').trim().isLength({ min: 100 }).withMessage('Content is required (minimum 100 characters)'),
  body('category').isIn(['maintenance', 'security', 'fleet', 'technology', 'audio', 'general']).withMessage('Valid category is required'),
  body('status').optional().isIn(['draft', 'published', 'archived'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const postData = req.body;
    const post = new Blog(postData);
    await post.save();

    await post.populate('author', 'name email');

    res.status(201).json({
      message: 'Blog post created successfully',
      post
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating blog post' });
  }
});

// Update blog post
router.put('/:id', [
  param('id').isMongoId(),
  body('title').optional().trim().isLength({ min: 1, max: 100 }),
  body('excerpt').optional().trim().isLength({ min: 10, max: 200 }),
  body('content').optional().trim().isLength({ min: 100 }),
  body('category').optional().isIn(['maintenance', 'security', 'fleet', 'technology', 'audio', 'general']),
  body('status').optional().isIn(['draft', 'published', 'archived'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'name email');

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json({
      message: 'Blog post updated successfully',
      post
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating blog post' });
  }
});

// Delete blog post
router.delete('/:id', [
  param('id').isMongoId()
], async (req, res) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting blog post' });
  }
});

// Like/Unlike blog post
router.post('/:id/like', [
  param('id').isMongoId()
], async (req, res) => {
  try {
    const post = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json({
      message: 'Blog post liked successfully',
      likes: post.likes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while liking blog post' });
  }
});

// ===== MySQL BLOG ENDPOINTS =====

// MySQL Get all blog posts with filtering and pagination
router.get('/mysql/list', [
  query('category').optional().isIn(['maintenance', 'security', 'fleet', 'technology', 'audio', 'general']),
  query('status').optional().isIn(['draft', 'published', 'archived']),
  query('featured').optional().isBoolean(),
  query('search').optional().isString(),
  query('author').optional().isInt(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('sort').optional().isIn(['createdAt', '-createdAt', 'publishedAt', '-publishedAt', 'title'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      category,
      status = 'published',
      featured,
      search,
      author,
      page = 1,
      limit = 10,
      sort = '-publishedAt'
    } = req.query;

    // Build filter object
    const whereClause = { status };

    if (category) whereClause.category = category;
    if (featured === 'true') whereClause.isFeatured = true;
    if (author) whereClause.authorId = author;

    // Search functionality
    let posts;
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { content: { [Op.iLike]: `%${search}%` } },
        { excerpt: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows: blogPosts } = await MySQLBlog.findAndCountAll({
      where: whereClause,
      limit: limit,
      offset: (page - 1) * limit,
      order: [['publishedAt', 'DESC']]
    });

    res.json({
      posts: blogPosts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalPosts: count,
        hasNext: page * limit < count,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching MySQL blog posts' });
  }
});

// MySQL Get single blog post by ID
router.get('/mysql/:id', [
  param('id').isInt()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = await MySQLBlog.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'MySQL Blog post not found' });
    }

    // Increment view count
    await post.increment('views');

    res.json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching MySQL blog post' });
  }
});

// MySQL Get blog post by slug
router.get('/mysql/slug/:slug', async (req, res) => {
  try {
    const post = await MySQLBlog.findOne({ where: { slug: req.params.slug } });
    if (!post) {
      return res.status(404).json({ message: 'MySQL Blog post not found' });
    }

    // Increment view count
    await post.increment('views');

    res.json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching MySQL blog post' });
  }
});

// MySQL Get posts by category
router.get('/mysql/category/:category', [
  param('category').isIn(['maintenance', 'security', 'fleet', 'technology', 'audio', 'general']),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
], async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const { count, rows: posts } = await MySQLBlog.findAndCountAll({
      where: { category, status: 'published' },
      limit: limit,
      offset: (page - 1) * limit,
      order: [['publishedAt', 'DESC']]
    });

    res.json({
      posts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalPosts: count
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching MySQL blog posts by category' });
  }
});

// MySQL Get featured blog posts
router.get('/mysql/featured/list', async (req, res) => {
  try {
    const posts = await MySQLBlog.findAll({
      where: { isFeatured: true, status: 'published' },
      order: [['publishedAt', 'DESC']],
      limit: 6
    });

    res.json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching MySQL featured blog posts' });
  }
});

// MySQL Create new blog post (Admin/Author only)
router.post('/mysql/create', [
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title is required (1-100 characters)'),
  body('excerpt').trim().isLength({ min: 10, max: 200 }).withMessage('Excerpt is required (10-200 characters)'),
  body('content').trim().isLength({ min: 100 }).withMessage('Content is required (minimum 100 characters)'),
  body('category').isIn(['maintenance', 'security', 'fleet', 'technology', 'audio', 'general']).withMessage('Valid category is required'),
  body('status').optional().isIn(['draft', 'published', 'archived'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const postData = req.body;
    const post = await MySQLBlog.create(postData);

    res.status(201).json({
      message: 'MySQL Blog post created successfully',
      post
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating MySQL blog post' });
  }
});

// MySQL Update blog post
router.put('/mysql/:id', [
  param('id').isInt(),
  body('title').optional().trim().isLength({ min: 1, max: 100 }),
  body('excerpt').optional().trim().isLength({ min: 10, max: 200 }),
  body('content').optional().trim().isLength({ min: 100 }),
  body('category').optional().isIn(['maintenance', 'security', 'fleet', 'technology', 'audio', 'general']),
  body('status').optional().isIn(['draft', 'published', 'archived'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = await MySQLBlog.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'MySQL Blog post not found' });
    }

    await post.update(req.body);

    res.json({
      message: 'MySQL Blog post updated successfully',
      post
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating MySQL blog post' });
  }
});

// MySQL Delete blog post
router.delete('/mysql/:id', [
  param('id').isInt()
], async (req, res) => {
  try {
    const post = await MySQLBlog.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'MySQL Blog post not found' });
    }

    await post.destroy();

    res.json({ message: 'MySQL Blog post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting MySQL blog post' });
  }
});

// MySQL Like/Unlike blog post
router.post('/mysql/:id/like', [
  param('id').isInt()
], async (req, res) => {
  try {
    const post = await MySQLBlog.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'MySQL Blog post not found' });
    }

    await post.increment('likes');

    res.json({
      message: 'MySQL Blog post liked successfully',
      likes: post.likes + 1
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while liking MySQL blog post' });
  }
});

module.exports = router;
