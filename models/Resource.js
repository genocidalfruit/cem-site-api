const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  pincode: {
    type: String,
    required: true,
    index: true
  },
  resource: {
    type: String,
    required: true,
    enum: ['Cement', 'Steel', 'Bricks', 'Aggregate', 'Sand', 'Flooring', 'Windows', 'Doors', 'Electrical fittings', 'Painting']
  },
  basic: {
    quantity: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  medium: {
    quantity: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  premium: {
    quantity: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }
}, {
  timestamps: true
});

// Compound index for efficient querying
resourceSchema.index({ pincode: 1, resource: 1 });

module.exports = mongoose.model('Resource', resourceSchema);
