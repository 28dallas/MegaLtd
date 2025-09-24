const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  customerEmail: {
    type: String,
    required: [true, 'Customer email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  customerPhone: {
    type: String,
    required: [true, 'Customer phone is required']
  },
  service: {
    type: String,
    required: [true, 'Service type is required'],
    enum: [
      'Fuel Injection Services',
      'Car Alarms & Security Systems',
      'Android Radios & Car Stereos',
      'Vehicle Tracking & Fleet Management',
      '4G Live Dash Camera Solutions',
      'Diesel Parts Supply',
      'General Consultation'
    ]
  },
  vehicleInfo: {
    make: {
      type: String,
      trim: true
    },
    model: {
      type: String,
      trim: true
    },
    year: {
      type: Number,
      min: [1900, 'Year must be valid']
    },
    registration: {
      type: String,
      trim: true,
      uppercase: true
    }
  },
  preferredDate: {
    type: Date,
    required: [true, 'Preferred date is required']
  },
  preferredTime: {
    type: String,
    enum: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    required: [true, 'Preferred time is required']
  },
  urgency: {
    type: String,
    enum: ['normal', 'urgent', 'emergency'],
    default: 'normal'
  },
  message: {
    type: String,
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  assignedTechnician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  estimatedCost: {
    type: Number,
    min: [0, 'Cost must be positive']
  },
  actualCost: {
    type: Number,
    min: [0, 'Cost must be positive']
  },
  notes: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    enum: ['Nairobi CBD', 'Industrial Area', 'Customer Location'],
    default: 'Nairobi CBD'
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'mpesa', 'card', 'bank_transfer']
  }
}, {
  timestamps: true
});

// Index for efficient queries
bookingSchema.index({ preferredDate: 1, status: 1 });
bookingSchema.index({ customerEmail: 1 });
bookingSchema.index({ status: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
