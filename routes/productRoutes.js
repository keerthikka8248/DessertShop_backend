// routes/productRoutes.js
const express = require("express");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();
const {
    getAllProducts,
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getSpecialProducts,
    addReview,
    getProductReviews,
    getHomePageReviews
} = require("../controllers/productControllers");

// Routes
router.get("/getProducts", getAllProducts); // Get all products
router.post("/addProduct", addProduct); // Add a new product
router.get("/getProduct/:id", getProductById); // Get product by ID
router.put("/updateProduct/:id", updateProduct); // Update product
router.delete("/deleteProduct/:id", deleteProduct); // Delete product
router.get('/specials', getSpecialProducts); // get Special Products alone
router.post('/:productId/addReview', protect, addReview); // add Review for a Product
router.get("/:productId/getAllreviews", getProductReviews); // get All Reviews
router.get("/getHomepageReviews", getHomePageReviews); // get Reviews for HomePage

module.exports = router;
