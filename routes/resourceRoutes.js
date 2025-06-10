const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

// GET /api/resources/:pincode - Get all resources for a pincode
router.get('/:pincode', resourceController.getResourcesByPincode);

// POST /api/resources/calculate - Calculate total cost
router.post('/calculate', resourceController.calculateCost);

module.exports = router;