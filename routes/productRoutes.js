const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/tags', productController.getAllTags);
router.get('/materials', productController.getAllMaterials);
router.get('/:id', productController.getProductById);

// Admin routes (add authentication middleware as needed)
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;