const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Booking = sequelize.define('Booking', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    customerPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service: {
      type: DataTypes.ENUM(
        'Fuel Injection Services',
        'Car Alarms & Security Systems',
        'Android Radios & Car Stereos',
        'Vehicle Tracking & Fleet Management',
        '4G Live Dash Camera Solutions',
        'Diesel Parts Supply',
        'General Consultation'
      ),
      allowNull: false,
    },
    vehicleInfo: {
      type: DataTypes.JSON,
    },
    preferredDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    preferredTime: {
      type: DataTypes.ENUM('09:00', '10:00', '11:00', '14:00', '15:00', '16:00'),
      allowNull: false,
    },
    urgency: {
      type: DataTypes.ENUM('normal', 'urgent', 'emergency'),
      defaultValue: 'normal',
    },
    message: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'in-progress', 'completed', 'cancelled'),
      defaultValue: 'pending',
    },
    assignedTechnicianId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    estimatedCost: {
      type: DataTypes.DECIMAL(10, 2),
    },
    actualCost: {
      type: DataTypes.DECIMAL(10, 2),
    },
    notes: {
      type: DataTypes.TEXT,
    },
    location: {
      type: DataTypes.ENUM('Nairobi CBD', 'Industrial Area', 'Customer Location'),
      defaultValue: 'Nairobi CBD',
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    paymentMethod: {
      type: DataTypes.ENUM('cash', 'mpesa', 'card', 'bank_transfer'),
    },
  }, {
    timestamps: true,
  });

  return Booking;
};
