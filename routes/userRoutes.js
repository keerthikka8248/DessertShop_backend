const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require("../controllers/userController");
const { protect, admin } = require("../middlewares/authMiddleware");
const { updateUserProfile } = require('../controllers/userController');
const { addToWishlist,
    getWishlist,
    removeFromWishlist,
    addToCart,
    getCart,
    removeFromCart} = require('../controllers/userController');


// Public routes
router.post("/register", registerUser); // Register user
router.post("/login", loginUser); // Login user

// Protected routes
router.get("/profile", protect, getUserProfile); // Get user profile
router.put('/updateProfile', protect, updateUserProfile); // Update user profile

//Wishlist routes
router.post('/addwishlist/:productId', protect, addToWishlist);
router.get('/wishlist', protect, getWishlist);
router.delete('/removewishlist/:productId', protect, removeFromWishlist);

//Cart routes
router.post('/addcart/:productId', protect, addToCart);
router.get('/cart', protect, getCart);
router.delete('/removecart/:productId', protect, removeFromCart);

module.exports = router;
