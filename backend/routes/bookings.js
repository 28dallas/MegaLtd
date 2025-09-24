const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const Booking = require('../models/Booking');
const MySQLBooking = require('../models/mysql/Booking');

const router = express.Router();

// Get all bookings with filtering
router.get('/', [
  query('status').optional().isIn(['pending', 'confirmed', 'in-progress', 'completed', 'cancelled']),
  query('service').optional().isString(),
  query('dateFrom').optional().isISO8601(),
  query('dateTo').optional().isISO8601(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      status,
      service,
      dateFrom,
      dateTo,
      page = 1,
      limit = 20,
      sort = '-createdAt'
    } = req.query;

    // Build filter object
    const filter = {};

    if (status) filter.status = status;
    if (service) filter.service = service;
    if (dateFrom || dateTo) {
      filter.preferredDate = {};
      if (dateFrom) filter.preferredDate.$gte = new Date(dateFrom);
      if (dateTo) filter.preferredDate.$lte = new Date(dateTo);
    }

    const bookings = await Booking.find(filter)
      .populate('assignedTechnician', 'name email')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Booking.countDocuments(filter);

    res.json({
      bookings,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalBookings: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
});

// Get booking by ID
router.get('/:id', [
  param('id').isMongoId()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const booking = await Booking.findById(req.params.id)
      .populate('assignedTechnician', 'name email phone');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching booking' });
  }
});

// Create new booking
router.post('/', [
  body('customerName').trim().isLength({ min: 2 }).withMessage('Customer name is required'),
  body('customerEmail').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('customerPhone').isMobilePhone().withMessage('Valid phone number is required'),
  body('service').isIn([
    'Fuel Injection Services',
    'Car Alarms & Security Systems',
    'Android Radios & Car Stereos',
    'Vehicle Tracking & Fleet Management',
    '4G Live Dash Camera Solutions',
    'Diesel Parts Supply',
    'General Consultation'
  ]).withMessage('Valid service is required'),
  body('preferredDate').isISO8601().withMessage('Valid preferred date is required'),
  body('preferredTime').isIn(['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']).withMessage('Valid preferred time is required'),
  body('urgency').optional().isIn(['normal', 'urgent', 'emergency'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const bookingData = req.body;

    // Check for conflicting bookings
    const existingBooking = await Booking.findOne({
      preferredDate: bookingData.preferredDate,
      preferredTime: bookingData.preferredTime,
      status: { $in: ['pending', 'confirmed', 'in-progress'] }
    });

    if (existingBooking) {
      return res.status(409).json({
        message: 'Time slot is already booked. Please choose a different time.'
      });
    }

    const booking = new Booking(bookingData);
    await booking.save();

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating booking' });
  }
});

// Update booking status
router.patch('/:id/status', [
  param('id').isMongoId(),
  body('status').isIn(['pending', 'confirmed', 'in-progress', 'completed', 'cancelled']).withMessage('Valid status is required'),
  body('notes').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status, notes } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({
      message: 'Booking status updated successfully',
      booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating booking status' });
  }
});

// Update booking
router.put('/:id', [
  param('id').isMongoId(),
  body('customerName').optional().trim().isLength({ min: 2 }),
  body('customerEmail').optional().isEmail().normalizeEmail(),
  body('customerPhone').optional().isMobilePhone(),
  body('service').optional().isIn([
    'Fuel Injection Services',
    'Car Alarms & Security Systems',
    'Android Radios & Car Stereos',
    'Vehicle Tracking & Fleet Management',
    '4G Live Dash Camera Solutions',
    'Diesel Parts Supply',
    'General Consultation'
  ]),
  body('preferredDate').optional().isISO8601(),
  body('preferredTime').optional().isIn(['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']),
  body('urgency').optional().isIn(['normal', 'urgent', 'emergency'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({
      message: 'Booking updated successfully',
      booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating booking' });
  }
});

// Delete booking
router.delete('/:id', [
  param('id').isMongoId()
], async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting booking' });
  }
});

// Get available time slots for a specific date
router.get('/availability/:date', [
  param('date').isISO8601()
], async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const bookedSlots = await Booking.find({
      preferredDate: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: ['pending', 'confirmed', 'in-progress'] }
    }).select('preferredTime');

    const allTimeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
    const availableSlots = allTimeSlots.filter(slot =>
      !bookedSlots.some(booking => booking.preferredTime === slot)
    );

    res.json({
      date: req.params.date,
      availableSlots,
      bookedSlots: bookedSlots.map(b => b.preferredTime)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching availability' });
  }
});

// ===== MySQL BOOKING ENDPOINTS =====

// MySQL Get all bookings with filtering
router.get('/mysql/list', [
  query('status').optional().isIn(['pending', 'confirmed', 'in-progress', 'completed', 'cancelled']),
  query('service').optional().isString(),
  query('dateFrom').optional().isISO8601(),
  query('dateTo').optional().isISO8601(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      status,
      service,
      dateFrom,
      dateTo,
      page = 1,
      limit = 20
    } = req.query;

    // Build filter object
    const whereClause = {};

    if (status) whereClause.status = status;
    if (service) whereClause.service = service;
    if (dateFrom || dateTo) {
      whereClause.preferredDate = {};
      if (dateFrom) whereClause.preferredDate[Op.gte] = new Date(dateFrom);
      if (dateTo) whereClause.preferredDate[Op.lte] = new Date(dateTo);
    }

    const { count, rows: bookings } = await MySQLBooking.findAndCountAll({
      where: whereClause,
      limit: limit,
      offset: (page - 1) * limit,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      bookings,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalBookings: count,
        hasNext: page * limit < count,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching MySQL bookings' });
  }
});

// MySQL Get booking by ID
router.get('/mysql/:id', [
  param('id').isInt()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const booking = await MySQLBooking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'MySQL Booking not found' });
    }

    res.json({ booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching MySQL booking' });
  }
});

// MySQL Create new booking
router.post('/mysql/create', [
  body('customerName').trim().isLength({ min: 2 }).withMessage('Customer name is required'),
  body('customerEmail').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('customerPhone').isMobilePhone().withMessage('Valid phone number is required'),
  body('service').isIn([
    'Fuel Injection Services',
    'Car Alarms & Security Systems',
    'Android Radios & Car Stereos',
    'Vehicle Tracking & Fleet Management',
    '4G Live Dash Camera Solutions',
    'Diesel Parts Supply',
    'General Consultation'
  ]).withMessage('Valid service is required'),
  body('preferredDate').isISO8601().withMessage('Valid preferred date is required'),
  body('preferredTime').isIn(['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']).withMessage('Valid preferred time is required'),
  body('urgency').optional().isIn(['normal', 'urgent', 'emergency'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const bookingData = req.body;

    // Check for conflicting bookings
    const existingBooking = await MySQLBooking.findOne({
      where: {
        preferredDate: bookingData.preferredDate,
        preferredTime: bookingData.preferredTime,
        status: { [Op.in]: ['pending', 'confirmed', 'in-progress'] }
      }
    });

    if (existingBooking) {
      return res.status(409).json({
        message: 'Time slot is already booked. Please choose a different time.'
      });
    }

    const booking = await MySQLBooking.create(bookingData);

    res.status(201).json({
      message: 'MySQL Booking created successfully',
      booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating MySQL booking' });
  }
});

// MySQL Update booking status
router.patch('/mysql/:id/status', [
  param('id').isInt(),
  body('status').isIn(['pending', 'confirmed', 'in-progress', 'completed', 'cancelled']).withMessage('Valid status is required'),
  body('notes').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status, notes } = req.body;
    const booking = await MySQLBooking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'MySQL Booking not found' });
    }

    await booking.update({ status, notes });

    res.json({
      message: 'MySQL Booking status updated successfully',
      booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating MySQL booking status' });
  }
});

// MySQL Update booking
router.put('/mysql/:id', [
  param('id').isInt(),
  body('customerName').optional().trim().isLength({ min: 2 }),
  body('customerEmail').optional().isEmail().normalizeEmail(),
  body('customerPhone').optional().isMobilePhone(),
  body('service').optional().isIn([
    'Fuel Injection Services',
    'Car Alarms & Security Systems',
    'Android Radios & Car Stereos',
    'Vehicle Tracking & Fleet Management',
    '4G Live Dash Camera Solutions',
    'Diesel Parts Supply',
    'General Consultation'
  ]),
  body('preferredDate').optional().isISO8601(),
  body('preferredTime').optional().isIn(['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']),
  body('urgency').optional().isIn(['normal', 'urgent', 'emergency'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const booking = await MySQLBooking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'MySQL Booking not found' });
    }

    await booking.update(req.body);

    res.json({
      message: 'MySQL Booking updated successfully',
      booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating MySQL booking' });
  }
});

// MySQL Delete booking
router.delete('/mysql/:id', [
  param('id').isInt()
], async (req, res) => {
  try {
    const booking = await MySQLBooking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'MySQL Booking not found' });
    }

    await booking.destroy();

    res.json({ message: 'MySQL Booking deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting MySQL booking' });
  }
});

// MySQL Get available time slots for a specific date
router.get('/mysql/availability/:date', [
  param('date').isISO8601()
], async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const bookedSlots = await MySQLBooking.findAll({
      where: {
        preferredDate: { [Op.between]: [startOfDay, endOfDay] },
        status: { [Op.in]: ['pending', 'confirmed', 'in-progress'] }
      },
      attributes: ['preferredTime']
    });

    const allTimeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
    const availableSlots = allTimeSlots.filter(slot =>
      !bookedSlots.some(booking => booking.preferredTime === slot)
    );

    res.json({
      date: req.params.date,
      availableSlots,
      bookedSlots: bookedSlots.map(b => b.preferredTime)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching MySQL availability' });
  }
});

module.exports = router;
