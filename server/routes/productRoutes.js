const express = require('express');
const router = express.Router();
const { getProducts, createProduct, deleteProduct, getDashboardStats } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getProducts).post(protect, createProduct);
router.route('/:id').delete(protect, deleteProduct);
router.route('/stats').get(protect, getDashboardStats);

module.exports = router;