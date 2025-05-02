const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                name: {type: String, required: true},
                quantity: { type: Number, required: true},
                price: { type: Number, required: true},
            },
        ],
        shippingAddress: {
            address: { type: String, required: true},
            city: { type: String, required: true},
            postalCode: { type: String, required: true},
            country: { type: String, required: true},
        },
        paymentMethod: { type: String, required: true},
        status: {
            type: String,
            enum: ['pending','processing','shipped','delivered','cancelled'],
            default: 'pending',
        },
        totalPrice: { type: Number, required: true},
    },
    { timestamps: true}
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;