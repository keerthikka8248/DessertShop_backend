// controllers/productController.js
const Product = require("../models/productModels");

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: "Error fetching products" });
    }
};

// Add a product
exports.addProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.error("Error adding product:", err.message);
        if (err.name === "ValidationError") {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: "Internal server error" });}
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (err) {
        console.error("Error fetching product:", err.message);
        res.status(500).json({ error: "Error fetching product" });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true, // Ensures schema validation
        });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    } catch (err) {
        console.error("Error updating product:", err.message);
        res.status(400).json({ error: "Error updating product" });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error("Error deleting product:", err.message);
        res.status(500).json({ error: "Error deleting product" });
    }
};

// Get special products
exports.getSpecialProducts = async (req, res) => {
    try {
        const specials = await Product.find({ isSpecial: true }); // Fetch only special products
        res.status(200).json(specials);
    } catch (error) {
        console.error("Error fetching specials:", error.message);
        res.status(500).json({ message: "Error fetching specials" });
    }
};

// Add or Update Review
exports.addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            // Update existing review
            alreadyReviewed.rating = rating;
            alreadyReviewed.comment = comment;
        } else {
            // Add new review
            const review = {
                user: req.user._id,
                name: req.user.name,
                rating: Number(rating),
                comment
            };
            product.reviews.push(review);
        }

        // Recalculate average rating and total reviews
        product.numReviews = product.reviews.length;
        product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        await product.save();
        res.status(200).json({ message: "Review added/updated" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all reviews of a product
exports.getProductReviews = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).populate("reviews.user", "name email");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ reviews: product.reviews });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a few reviews from multiple products for homepage
exports.getHomePageReviews = async (req, res) => {
    try {
      const products = await Product.find({ "reviews.0": { $exists: true } }); // Products that have at least 1 review
  
      let allReviews = [];
  
      products.forEach((product) => {
        product.reviews.forEach((review) => {
          allReviews.push({
            productId: product._id,
            productName: product.name,
            productImage: product.image,
            ...review._doc, // Include user, name, rating, comment
          });
        });
      });
  
      // Shuffle and pick 4 random reviews
      allReviews = allReviews.sort(() => 0.5 - Math.random()).slice(0, 4);
  
      res.status(200).json(allReviews);
    } catch (error) {
      console.error("Error fetching homepage reviews:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };