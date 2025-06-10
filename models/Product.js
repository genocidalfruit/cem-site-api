const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  link: {
    type: String,
    default: '/'
  },
  url: { // Added URL field
    type: String,
    trim: true,
    // You can add 'required: true' if every product must have a URL
    // You might also want to add a custom validator for URL format
  },
  tags: [{
    type: String,
    trim: true
  }],
  material: {
    type: String,
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
productSchema.index({ material: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ price: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ url: 1 }); // Consider adding an index if you'll query by URL frequently

module.exports = mongoose.model('Product', productSchema);