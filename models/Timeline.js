const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
  pincode: {
    type: String,
    required: true,
    index: true
  },
  timelineData: [{
    label: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    offset: {
      type: Number,
      required: true
    },
    cost: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Timeline', timelineSchema);