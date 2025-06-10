const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartController');

// GET /api/charts/cost-breakdown/:pincode - Get cost breakdown chart data
router.get('/cost-breakdown/:pincode', chartController.getCostBreakdown);

// GET /api/charts/timeline/:pincode - Get timeline chart data
router.get('/timeline/:pincode', chartController.getTimeline);

module.exports = router;