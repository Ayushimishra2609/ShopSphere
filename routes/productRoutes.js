const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controllers/productController');

// Define routes
router.get('/', getAllProducts);  // Changed from '/products' to '/'
module.exports = router;

