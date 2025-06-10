const Product = require('../models/Product');

const productController = {
  // Get all products with optional filtering
  getAllProducts: async (req, res) => {
    try {
      const {
        budget,
        tags,
        materials,
        page = 1,
        limit = 10,
        sortBy = 'name',
        sortOrder = 'asc'
      } = req.query;

      // Build filter object
      const filter = { isActive: true };

      // Budget filter
      if (budget) {
        filter.price = { $lte: parseInt(budget) };
      }

      // Tags filter (products must have ALL specified tags)
      if (tags) {
        const tagArray = Array.isArray(tags) ? tags : tags.split(',');
        filter.tags = { $all: tagArray };
      }

      // Materials filter
      if (materials) {
        const materialArray = Array.isArray(materials) ? materials : materials.split(',');
        filter.material = { $in: materialArray };
      }

      // Pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);

      // Sort configuration
      const sortConfig = {};
      sortConfig[sortBy] = sortOrder === 'desc' ? -1 : 1;

      // Execute query
      const products = await Product.find(filter)
        .sort(sortConfig)
        .skip(skip)
        .limit(parseInt(limit));

      // Get total count for pagination
      const totalProducts = await Product.countDocuments(filter);
      const totalPages = Math.ceil(totalProducts / parseInt(limit));

      res.status(200).json({
        success: true,
        data: {
          products,
          pagination: {
            currentPage: parseInt(page),
            totalPages,
            totalProducts,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching products',
        error: error.message
      });
    }
  },

  // Get single product by ID
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);

      if (!product || !product.isActive) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching product',
        error: error.message
      });
    }
  },

  // Get all unique tags
  getAllTags: async (req, res) => {
    try {
      const tags = await Product.distinct('tags', { isActive: true });
      res.status(200).json({
        success: true,
        data: tags.sort()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching tags',
        error: error.message
      });
    }
  },

  // Get all unique materials
  getAllMaterials: async (req, res) => {
    try {
      const materials = await Product.distinct('material', { isActive: true });
      res.status(200).json({
        success: true,
        data: materials.sort()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching materials',
        error: error.message
      });
    }
  },

  // Create new product (Admin only)
  createProduct: async (req, res) => {
    try {
      const productData = req.body;
      // Mongoose will automatically pick up the 'url' field if it's present in productData
      const product = new Product(productData);
      const savedProduct = await product.save();

      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: savedProduct
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error creating product',
        error: error.message
      });
    }
  },

  // Update product (Admin only)
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      // Mongoose will automatically pick up the 'url' field if it's present in updateData
      const product = await Product.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: product
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error updating product',
        error: error.message
      });
    }
  },

  // Delete product (Admin only)
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Soft delete - just mark as inactive
      const product = await Product.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
      );

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting product',
        error: error.message
      });
    }
  }
};

module.exports = productController;