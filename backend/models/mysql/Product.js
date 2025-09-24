const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM('injectors', 'alarms', 'radios', 'trackers', 'cameras', 'parts'),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    originalPrice: {
      type: DataTypes.DECIMAL(10, 2),
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    images: {
      type: DataTypes.JSON,
    },
    specifications: {
      type: DataTypes.JSON,
    },
    features: {
      type: DataTypes.JSON,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    warranty: {
      type: DataTypes.STRING,
    },
    weight: {
      type: DataTypes.DECIMAL(10, 2),
    },
    dimensions: {
      type: DataTypes.JSON,
    },
    brand: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
    },
    compatibility: {
      type: DataTypes.JSON,
    },
  }, {
    timestamps: true,
  });

  return Product;
};
