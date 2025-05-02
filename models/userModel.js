const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const cartItemSchema = new mongoose.Schema({
    product: {type: mongoose.Schema.Types.ObjectId, ref:"Product", required: true},
    quantity: {type:Number, default: 1}
});
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: false }, // New field for phone number
    address: {
        street: { type: String, required: false },
        city: { type: String, required: false },
        state: { type: String, required: false },
        zipCode: { type: String, required: false }
    }, // New field for address
    isAdmin: { type: Boolean, default: false },
    wishlist: [{type: mongoose.Schema.Types.ObjectId, ref:"Product" }],
    cart: [cartItemSchema]
}, {
    timestamps: true,});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
