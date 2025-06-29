const mongoose = require('mongoose')
const Product = require('./productModel')

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        Product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],

    totalAmount: Number,
    shippingAddress: {
        fullName: String,
        phone: String,
        street: String,
        city: String,
        postalCode: String,
        state: String,
        country: String

    },
    paymentMethod: {
        type: String,
        enum: ["COD", "Stripe", "PayPal", "Razorpay"],
        default: "COD"
    },
    status: {
        type: String,
        default: 'pending',

    },
    razorpayOrderId: String,
    razorPayPaymentId: String,
    razorpaySignature: String,
    paymentIntentId: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})
const Order = mongoose.model("Order", orderSchema)
module.exports = Order