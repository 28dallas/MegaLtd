const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Contact = sequelize.define('Contact', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    service: {
      type: DataTypes.STRING,
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
      defaultValue: 'medium',
    },
    status: {
      type: DataTypes.ENUM('new', 'in-progress', 'responded', 'closed'),
      defaultValue: 'new',
    },
    assignedToId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    response: {
      type: DataTypes.TEXT,
    },
    respondedAt: {
      type: DataTypes.DATE,
    },
    source: {
      type: DataTypes.ENUM('website', 'phone', 'email', 'whatsapp', 'social'),
      defaultValue: 'website',
    },
    ipAddress: {
      type: DataTypes.STRING,
    },
    userAgent: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: true,
  });

  return Contact;
};
