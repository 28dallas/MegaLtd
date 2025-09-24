const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Middleware to verify fleet client token
const verifyFleetToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId);

    if (!user || user.role !== 'fleet_client') {
      return res.status(403).json({ message: 'Access denied. Fleet client access required.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Fleet client login
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email, role: 'fleet_client' });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials or access denied' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ message: 'Account is deactivated' });
    }

    // Compare passwords
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Fleet portal login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        company: user.company
      },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during fleet login' });
  }
});

// Get fleet dashboard data
router.get('/dashboard', verifyFleetToken, async (req, res) => {
  try {
    // This would typically fetch real fleet data from your GPS tracking system
    // For now, we'll return mock data structure

    const dashboardData = {
      totalVehicles: 15,
      activeVehicles: 12,
      inactiveVehicles: 3,
      totalDistance: 2450.5, // km today
      totalFuel: 890.2, // liters consumed today
      alerts: {
        speeding: 3,
        geofence: 1,
        maintenance: 2,
        lowFuel: 1
      },
      recentTrips: [
        {
          vehicleId: 'KBZ 123A',
          driver: 'John Doe',
          startTime: new Date().toISOString(),
          distance: 45.2,
          status: 'completed'
        },
        {
          vehicleId: 'KCA 456B',
          driver: 'Jane Smith',
          startTime: new Date().toISOString(),
          distance: 23.8,
          status: 'in-progress'
        }
      ],
      vehicles: [
        {
          id: 'KBZ 123A',
          registration: 'KBZ 123A',
          driver: 'John Doe',
          status: 'online',
          location: {
            lat: -1.2921,
            lng: 36.8219,
            address: 'Nairobi CBD'
          },
          speed: 45,
          lastUpdate: new Date().toISOString()
        },
        {
          id: 'KCA 456B',
          registration: 'KCA 456B',
          driver: 'Jane Smith',
          status: 'online',
          location: {
            lat: -1.2864,
            lng: 36.8172,
            address: 'Westlands, Nairobi'
          },
          speed: 0,
          lastUpdate: new Date().toISOString()
        }
      ]
    };

    res.json({
      message: 'Fleet dashboard data retrieved successfully',
      data: dashboardData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching fleet dashboard data' });
  }
});

// Get vehicle details
router.get('/vehicles/:vehicleId', verifyFleetToken, [
  param('vehicleId').isString().withMessage('Vehicle ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { vehicleId } = req.params;

    // Mock vehicle data - replace with actual GPS tracking system integration
    const vehicleData = {
      id: vehicleId,
      registration: vehicleId,
      make: 'Toyota',
      model: 'Prado',
      year: 2020,
      driver: 'John Doe',
      status: 'online',
      currentLocation: {
        lat: -1.2921,
        lng: 36.8219,
        address: 'Nairobi CBD, Kenya',
        timestamp: new Date().toISOString()
      },
      speed: 45,
      heading: 90,
      odometer: 125430,
      fuelLevel: 75,
      engineStatus: 'running',
      lastMaintenance: {
        date: '2024-01-10',
        mileage: 120000,
        type: 'Regular Service'
      },
      alerts: [
        {
          type: 'speeding',
          message: 'Vehicle exceeded speed limit',
          timestamp: new Date().toISOString(),
          location: { lat: -1.2921, lng: 36.8219 }
        }
      ],
      tripHistory: [
        {
          startTime: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          endTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          distance: 45.2,
          startLocation: 'Nairobi CBD',
          endLocation: 'Westlands'
        }
      ]
    };

    res.json({
      message: 'Vehicle data retrieved successfully',
      vehicle: vehicleData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching vehicle data' });
  }
});

// Get fleet alerts
router.get('/alerts', verifyFleetToken, [
  query('type').optional().isIn(['speeding', 'geofence', 'maintenance', 'lowFuel', 'offline']),
  query('status').optional().isIn(['active', 'acknowledged', 'resolved']),
  query('limit').optional().isInt({ min: 1, max: 100 })
], async (req, res) => {
  try {
    const { type, status = 'active', limit = 20 } = req.query;

    // Mock alerts data - replace with actual GPS tracking system integration
    const alerts = [
      {
        id: 'alert_001',
        type: 'speeding',
        message: 'Vehicle KBZ 123A exceeded speed limit (85 km/h in 60 km/h zone)',
        vehicleId: 'KBZ 123A',
        location: { lat: -1.2921, lng: 36.8219 },
        timestamp: new Date().toISOString(),
        status: 'active'
      },
      {
        id: 'alert_002',
        type: 'geofence',
        message: 'Vehicle KCA 456B entered restricted area',
        vehicleId: 'KCA 456B',
        location: { lat: -1.2864, lng: 36.8172 },
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        status: 'active'
      },
      {
        id: 'alert_003',
        type: 'maintenance',
        message: 'Vehicle KBY 789C is due for scheduled maintenance',
        vehicleId: 'KBY 789C',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: 'active'
      }
    ];

    let filteredAlerts = alerts;

    if (type) {
      filteredAlerts = filteredAlerts.filter(alert => alert.type === type);
    }

    if (status) {
      filteredAlerts = filteredAlerts.filter(alert => alert.status === status);
    }

    filteredAlerts = filteredAlerts.slice(0, limit);

    res.json({
      message: 'Fleet alerts retrieved successfully',
      alerts: filteredAlerts,
      total: filteredAlerts.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching fleet alerts' });
  }
});

// Acknowledge alert
router.patch('/alerts/:alertId/acknowledge', verifyFleetToken, [
  param('alertId').isString().withMessage('Alert ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Mock alert acknowledgment - replace with actual GPS tracking system integration
    res.json({
      message: 'Alert acknowledged successfully',
      alertId: req.params.alertId,
      status: 'acknowledged',
      acknowledgedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while acknowledging alert' });
  }
});

// Get fleet reports
router.get('/reports', verifyFleetToken, [
  query('type').optional().isIn(['daily', 'weekly', 'monthly', 'custom']),
  query('dateFrom').optional().isISO8601(),
  query('dateTo').optional().isISO8601()
], async (req, res) => {
  try {
    const { type = 'daily', dateFrom, dateTo } = req.query;

    // Mock report data - replace with actual GPS tracking system integration
    const reportData = {
      type,
      period: {
        from: dateFrom || new Date().toISOString().split('T')[0],
        to: dateTo || new Date().toISOString().split('T')[0]
      },
      summary: {
        totalVehicles: 15,
        totalDistance: 2450.5,
        totalFuel: 890.2,
        averageSpeed: 45.2,
        totalTrips: 67,
        alertsCount: 12
      },
      vehicleStats: [
        {
          vehicleId: 'KBZ 123A',
          distance: 234.5,
          fuel: 89.2,
          trips: 8,
          averageSpeed: 42.1
        },
        {
          vehicleId: 'KCA 456B',
          distance: 189.3,
          fuel: 67.8,
          trips: 6,
          averageSpeed: 38.9
        }
      ],
      alerts: {
        speeding: 5,
        geofence: 2,
        maintenance: 3,
        lowFuel: 2
      }
    };

    res.json({
      message: 'Fleet report generated successfully',
      report: reportData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while generating fleet report' });
  }
});

// Get geofences
router.get('/geofences', verifyFleetToken, async (req, res) => {
  try {
    // Mock geofences data - replace with actual GPS tracking system integration
    const geofences = [
      {
        id: 'geofence_001',
        name: 'Nairobi CBD',
        type: 'allowed',
        coordinates: [
          [-1.2921, 36.8219],
          [-1.2864, 36.8172],
          [-1.2921, 36.8125],
          [-1.2978, 36.8172]
        ],
        radius: null
      },
      {
        id: 'geofence_002',
        name: 'Industrial Area',
        type: 'restricted',
        coordinates: null,
        radius: 2000,
        center: [-1.3100, 36.8500]
      }
    ];

    res.json({
      message: 'Geofences retrieved successfully',
      geofences
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching geofences' });
  }
});

module.exports = router;
