const CostBreakdown = require('../models/CostBreakdown');
const Timeline = require('../models/Timeline');

// Get cost breakdown chart data
exports.getCostBreakdown = async (req, res) => {
  try {
    const { pincode } = req.params;
    
    const breakdown = await CostBreakdown.findOne({ pincode });
    
    if (!breakdown) {
      return res.status(404).json({
        success: false,
        message: 'Cost breakdown data not found for this pincode'
      });
    }
    
    res.json({
      success: true,
      data: breakdown.breakdownData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get timeline chart data
exports.getTimeline = async (req, res) => {
  try {
    const { pincode } = req.params;
    
    const timeline = await Timeline.findOne({ pincode });
    
    if (!timeline) {
      return res.status(404).json({
        success: false,
        message: 'Timeline data not found for this pincode'
      });
    }
    
    res.json({
      success: true,
      data: timeline.timelineData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};