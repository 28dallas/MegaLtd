const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Blog = sequelize.define('Blog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    excerpt: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    category: {
      type: DataTypes.ENUM('maintenance', 'security', 'fleet', 'technology', 'audio', 'general'),
      allowNull: false,
    },
    tags: {
      type: DataTypes.JSON,
    },
    featuredImage: {
      type: DataTypes.STRING,
    },
    images: {
      type: DataTypes.JSON,
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      defaultValue: 'draft',
    },
    publishedAt: {
      type: DataTypes.DATE,
    },
    readTime: {
      type: DataTypes.INTEGER,
    },
    seoTitle: {
      type: DataTypes.STRING(60),
    },
    seoDescription: {
      type: DataTypes.STRING(160),
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    allowComments: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    timestamps: true,
    hooks: {
      beforeCreate: (blog) => {
        if (blog.title && !blog.slug) {
          blog.slug = blog.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9 ]/g, '')
            .replace(/\s+/g, '-');
        }
        if (blog.status === 'published' && !blog.publishedAt) {
          blog.publishedAt = new Date();
        }
      },
      beforeUpdate: (blog) => {
        if (blog.changed('title') && !blog.slug) {
          blog.slug = blog.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9 ]/g, '')
            .replace(/\s+/g, '-');
        }
        if (blog.changed('status') && blog.status === 'published' && !blog.publishedAt) {
          blog.publishedAt = new Date();
        }
      },
    },
  });

  return Blog;
};
