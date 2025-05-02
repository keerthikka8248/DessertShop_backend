// models/productModel.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // Store image URLs
    category: { type: String, required: true }, // E.g., "Chocolate"
    stock: { type: Number, default: 0 },
    ratings: { type: Number, default: 0 },
    isSpecial: { type: Boolean, default: false },
    reviews: [reviewSchema]
});

module.exports = mongoose.model("Product", productSchema);
