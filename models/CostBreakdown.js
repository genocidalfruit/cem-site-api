const mongoose = require('mongoose');

const costBreakdownSchema = new mongoose.Schema({
  pincode: {
    type: String,
    required: true,
    index: true
  },
  breakdownData: [{
    label: {
      type: String,
      required: true
    },
    percentage: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('CostBreakdown', costBreakdownSchema);