const express = require('express');
const { 
    createOrder, 
    getUserOrders, 
    getAllOrders, 
    getOrderById, 
    updateOrderStatus, 
    deleteOrder 
} = require('../controllers/orderController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new order
router.post('/createOrder', protect, createOrder);

// Get logged-in user's orders
router.get('/myorders', protect, getUserOrders);

// Get all orders (Admin)
router.get('/', protect, admin, getAllOrders);

// Get order by ID
router.get('/:id', protect, getOrderById);

// Update order status (Admin)
router.put('/:id', protect, admin, updateOrderStatus);

// Delete order (Admin)
router.delete('/:id', protect, admin, deleteOrder);

module.exports = router;
