const Resource = require('../models/Resource');

// Get all resources for a pincode
exports.getResourcesByPincode = async (req, res) => {
  try {
    const { pincode } = req.params;

    const resources = await Resource.find({ pincode }).sort({ resource: 1 });

    if (!resources || resources.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No resources found for this pincode'
      });
    }

    res.json({
      success: true,
      data: resources
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Calculate cost based on area and quality selections
exports.calculateCost = async (req, res) => {
  try {
    const { pincode, area, qualitySelections } = req.body;

    // Validate input
    if (!pincode || !area || !qualitySelections) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: pincode, area, qualitySelections'
      });
    }

    const resources = await Resource.find({ pincode });

    if (!resources || resources.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No resources found for this pincode'
      });
    }

    let totalAmount = 0;
    const calculations = [];

    resources.forEach(resource => {
      const quality = (qualitySelections[resource.resource] || 'basic').toLowerCase();

      // Extract price and quantity from the selected quality object
      const qualityData = resource[quality];

      if (!qualityData) {
        return; // Skip if quality data is not found
      }

      const price = qualityData.price;
      const quantity = qualityData.quantity;

      // Scale price based on area (assuming base is 5000 sq ft)
      const scaledPrice = Math.round((price * area) / 5000);

      totalAmount += scaledPrice;

      calculations.push({
        resource: resource.resource,
        quantity,
        quality,
        price: scaledPrice
      });
    });

    const costPerSqft = Math.round(totalAmount / area);

    res.json({
      success: true,
      data: {
        totalAmount,
        costPerSqft,
        calculations,
        area,
        pincode
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
