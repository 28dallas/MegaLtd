const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const Product = require('../models/Product');
const MySQLProduct = require('../models/mysql/Product');

const router = express.Router();

// Get all products with filtering and pagination
router.get('/', [
  query('category').optional().isIn(['injectors', 'alarms', 'radios', 'trackers', 'cameras', 'parts']),
  query('minPrice').optional().isNumeric(),
  query('maxPrice').optional().isNumeric(),
  query('inStock').optional().isBoolean(),
  query('featured').optional().isBoolean(),
  query('search').optional().isString(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      category,
      minPrice,
      maxPrice,
      inStock,
      featured,
      search,
      page = 1,
      limit = 12,
      sort = '-createdAt'
    } = req.query;

    // Build filter object
    const filter = { isActive: true };

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }
    if (inStock === 'true') filter.stock = { $gt: 0 };
    if (featured === 'true') filter.isFeatured = true;

    // Search functionality
    let products;
    if (search) {
      products = await Product.find({
        $and: [
          filter,
          {
            $or: [
              { name: { $regex: search, $options: 'i' } },
              { description: { $regex: search, $options: 'i' } }
            ]
          }
        ]
      })
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    } else {
      products = await Product.find(filter)
        .sort(sort)
        .limit(limit * 1)
        .skip((page - 1) * limit);
    }

    const total = await Product.countDocuments(search ? {
      $and: [
        filter,
        {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
          ]
        }
      ]
    } : filter);

    res.json({
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalProducts: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching products' });
  }
});

// Get single product by ID
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid product ID')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = await Product.findOne({ _id: req.params.id, isActive: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching product' });
  }
});

// Get products by category
router.get('/category/:category', [
  param('category').isIn(['injectors', 'alarms', 'radios', 'trackers', 'cameras', 'parts']),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
], async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const products = await Product.find({ category, isActive: true })
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments({ category, isActive: true });

    res.json({
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalProducts: total
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching products by category' });
  }
});

// Get featured products
router.get('/featured/list', async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true, isActive: true })
      .sort('-createdAt')
      .limit(8);

    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching featured products' });
  }
});

// Create new product (Admin only)
router.post('/', [
  body('name').trim().isLength({ min: 1 }).withMessage('Product name is required'),
  body('description').trim().isLength({ min: 10 }).withMessage('Product description is required'),
  body('category').isIn(['injectors', 'alarms', 'radios', 'trackers', 'cameras', 'parts']),
  body('price').isNumeric().withMessage('Product price is required'),
  body('stock').isNumeric().withMessage('Stock quantity is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const productData = req.body;
    const product = new Product(productData);
    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating product' });
  }
});

// Update product (Admin only)
router.put('/:id', [
  param('id').isMongoId(),
  body('name').optional().trim().isLength({ min: 1 }),
  body('description').optional().trim().isLength({ min: 10 }),
  body('category').optional().isIn(['injectors', 'alarms', 'radios', 'trackers', 'cameras', 'parts']),
  body('price').optional().isNumeric(),
  body('stock').optional().isNumeric()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating product' });
  }
});

// Delete product (Admin only)
router.delete('/:id', [
  param('id').isMongoId()
], async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting product' });
  }
});

// MySQL Get all products
router.get('/mysql/list', async (req, res) => {
  try {
    const products = await MySQLProduct.findAll({ where: { isActive: true } });
    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching MySQL products' });
  }
});

// MySQL Get single product by ID
router.get('/mysql/:id', async (req, res) => {
  try {
    const product = await MySQLProduct.findByPk(req.params.id);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'MySQL Product not found' });
    }
    res.json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching MySQL product' });
  }
});

// MySQL Create new product
router.post('/mysql/create', [
  body('name').trim().isLength({ min: 1 }).withMessage('Product name is required'),
  body('description').trim().isLength({ min: 10 }).withMessage('Product description is required'),
  body('category').isIn(['injectors', 'alarms', 'radios', 'trackers', 'cameras', 'parts']),
  body('price').isNumeric().withMessage('Product price is required'),
  body('stock').isNumeric().withMessage('Stock quantity is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = await MySQLProduct.create(req.body);
    res.status(201).json({
      message: 'MySQL Product created successfully',
      product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating MySQL product' });
  }
});

module.exports = router;
