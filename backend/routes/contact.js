const express = require('express');
const { body, validationResult, query, param } = require('express-validator');
const { Op } = require('sequelize');
const Contact = require('../models/Contact');
const MySQLContact = require('../models/mysql/Contact');

const router = express.Router();

// Get all contact messages with filtering
router.get('/', [
  query('status').optional().isIn(['new', 'in-progress', 'responded', 'closed']),
  query('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
  query('source').optional().isIn(['website', 'phone', 'email', 'whatsapp', 'social']),
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
      priority,
      source,
      page = 1,
      limit = 20,
      sort = '-createdAt'
    } = req.query;

    // Build filter object
    const filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (source) filter.source = source;

    const contacts = await Contact.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Contact.countDocuments(filter);

    res.json({
      contacts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalContacts: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching contact messages' });
  }
});

// Get single contact message
router.get('/:id', [
  param('id').isMongoId()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.json({ contact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching contact message' });
  }
});

// Create new contact message
router.post('/', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('phone').isMobilePhone().withMessage('Please provide a valid phone number'),
  body('subject').trim().isLength({ min: 5 }).withMessage('Subject must be at least 5 characters'),
  body('message').trim().isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters'),
  body('service').optional().trim(),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
  body('source').optional().isIn(['website', 'phone', 'email', 'whatsapp', 'social'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contactData = {
      ...req.body,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent'),
      source: req.body.source || 'website'
    };

    const contact = new Contact(contactData);
    await contact.save();

    res.status(201).json({
      message: 'Contact message sent successfully. We will get back to you within 24 hours.',
      contact: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        status: contact.status,
        createdAt: contact.createdAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while sending contact message' });
  }
});

// Update contact message status
router.patch('/:id/status', [
  param('id').isMongoId(),
  body('status').isIn(['new', 'in-progress', 'responded', 'closed']).withMessage('Valid status is required'),
  body('response').optional().trim(),
  body('assignedTo').optional().isMongoId()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status, response, assignedTo } = req.body;
    const updateData = { status };

    if (response) {
      updateData.response = response;
      updateData.respondedAt = new Date();
    }

    if (assignedTo) {
      updateData.assignedTo = assignedTo;
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.json({
      message: 'Contact message status updated successfully',
      contact
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating contact status' });
  }
});

// Update contact message
router.put('/:id', [
  param('id').isMongoId(),
  body('name').optional().trim().isLength({ min: 2 }),
  body('email').optional().isEmail().normalizeEmail(),
  body('phone').optional().isMobilePhone(),
  body('subject').optional().trim().isLength({ min: 5 }),
  body('message').optional().trim().isLength({ min: 10, max: 1000 }),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.json({
      message: 'Contact message updated successfully',
      contact
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating contact message' });
  }
});

// Delete contact message
router.delete('/:id', [
  param('id').isMongoId()
], async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting contact message' });
  }
});

// Get contact statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const inProgressContacts = await Contact.countDocuments({ status: 'in-progress' });
    const respondedContacts = await Contact.countDocuments({ status: 'responded' });
    const closedContacts = await Contact.countDocuments({ status: 'closed' });

    const priorityStats = await Contact.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    const sourceStats = await Contact.aggregate([
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      total: totalContacts,
      byStatus: {
        new: newContacts,
        'in-progress': inProgressContacts,
        responded: respondedContacts,
        closed: closedContacts
      },
      byPriority: priorityStats.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {}),
      bySource: sourceStats.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {})
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching contact statistics' });
  }
});

// ===== MySQL CONTACT ENDPOINTS =====

// MySQL Get all contact messages with filtering
router.get('/mysql/list', [
  query('status').optional().isIn(['new', 'in-progress', 'responded', 'closed']),
  query('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
  query('source').optional().isIn(['website', 'phone', 'email', 'whatsapp', 'social']),
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
      priority,
      source,
      page = 1,
      limit = 20
    } = req.query;

    // Build filter object
    const whereClause = {};

    if (status) whereClause.status = status;
    if (priority) whereClause.priority = priority;
    if (source) whereClause.source = source;

    const { count, rows: contacts } = await MySQLContact.findAndCountAll({
      where: whereClause,
      limit: limit,
      offset: (page - 1) * limit,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      contacts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalContacts: count,
        hasNext: page * limit < count,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching MySQL contact messages' });
  }
});

// MySQL Get single contact message
router.get('/mysql/:id', [
  param('id').isInt()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contact = await MySQLContact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'MySQL Contact message not found' });
    }

    res.json({ contact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching MySQL contact message' });
  }
});

// MySQL Create new contact message
router.post('/mysql/create', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('phone').isMobilePhone().withMessage('Please provide a valid phone number'),
  body('subject').trim().isLength({ min: 5 }).withMessage('Subject must be at least 5 characters'),
  body('message').trim().isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters'),
  body('service').optional().trim(),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent']),
  body('source').optional().isIn(['website', 'phone', 'email', 'whatsapp', 'social'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contactData = {
      ...req.body,
      source: req.body.source || 'website'
    };

    const contact = await MySQLContact.create(contactData);

    res.status(201).json({
      message: 'MySQL Contact message sent successfully. We will get back to you within 24 hours.',
      contact: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        status: contact.status,
        createdAt: contact.createdAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while sending MySQL contact message' });
  }
});

// MySQL Update contact message status
router.patch('/mysql/:id/status', [
  param('id').isInt(),
  body('status').isIn(['new', 'in-progress', 'responded', 'closed']).withMessage('Valid status is required'),
  body('response').optional().trim(),
  body('assignedToId').optional().isInt()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status, response, assignedToId } = req.body;
    const updateData = { status };

    if (response) {
      updateData.response = response;
      updateData.respondedAt = new Date();
    }

    if (assignedToId) {
      updateData.assignedToId = assignedToId;
    }

    const contact = await MySQLContact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'MySQL Contact message not found' });
    }

    await contact.update(updateData);

    res.json({
      message: 'MySQL Contact message status updated successfully',
      contact
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating MySQL contact status' });
  }
});

// MySQL Update contact message
router.put('/mysql/:id', [
  param('id').isInt(),
  body('name').optional().trim().isLength({ min: 2 }),
  body('email').optional().isEmail().normalizeEmail(),
  body('phone').optional().isMobilePhone(),
  body('subject').optional().trim().isLength({ min: 5 }),
  body('message').optional().trim().isLength({ min: 10, max: 1000 }),
  body('priority').optional().isIn(['low', 'medium', 'high', 'urgent'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contact = await MySQLContact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'MySQL Contact message not found' });
    }

    await contact.update(req.body);

    res.json({
      message: 'MySQL Contact message updated successfully',
      contact
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating MySQL contact message' });
  }
});

// MySQL Delete contact message
router.delete('/mysql/:id', [
  param('id').isInt()
], async (req, res) => {
  try {
    const contact = await MySQLContact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'MySQL Contact message not found' });
    }

    await contact.destroy();

    res.json({ message: 'MySQL Contact message deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting MySQL contact message' });
  }
});

// MySQL Get contact statistics
router.get('/mysql/stats/summary', async (req, res) => {
  try {
    const totalContacts = await MySQLContact.count();
    const newContacts = await MySQLContact.count({ where: { status: 'new' } });
    const inProgressContacts = await MySQLContact.count({ where: { status: 'in-progress' } });
    const respondedContacts = await MySQLContact.count({ where: { status: 'responded' } });
    const closedContacts = await MySQLContact.count({ where: { status: 'closed' } });

    const priorityStats = await MySQLContact.findAll({
      attributes: [
        'priority',
        [MySQLContact.sequelize.fn('COUNT', MySQLContact.sequelize.col('priority')), 'count']
      ],
      where: { priority: { [Op.ne]: null } },
      group: ['priority']
    });

    const sourceStats = await MySQLContact.findAll({
      attributes: [
        'source',
        [MySQLContact.sequelize.fn('COUNT', MySQLContact.sequelize.col('source')), 'count']
      ],
      where: { source: { [Op.ne]: null } },
      group: ['source']
    });

    res.json({
      total: totalContacts,
      byStatus: {
        new: newContacts,
        'in-progress': inProgressContacts,
        responded: respondedContacts,
        closed: closedContacts
      },
      byPriority: priorityStats.reduce((acc, stat) => {
        acc[stat.priority] = parseInt(stat.dataValues.count);
        return acc;
      }, {}),
      bySource: sourceStats.reduce((acc, stat) => {
        acc[stat.source] = parseInt(stat.dataValues.count);
        return acc;
      }, {})
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching MySQL contact statistics' });
  }
});

module.exports = router;
