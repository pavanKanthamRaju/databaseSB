const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const crypto = require("crypto");

exports.placeOrder = async (req, res) => {
    try {

        const userId = req.user._id
        const {
            razorPayOrderId,
            razorPayPaymentId,
            razorPaySignature,
            shippingAddress,
            paymentMethod
        } = req.body
        const user = await User.findById(userId).populate("cart.productId");;



        // if(!razorPayOrderId || !razorPayPaymentId || !razorPaySignature) return res.status(400).json({message: "Payment not completed"})

        // const generatedSingature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
        // .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        // .digest('hex');
        // if(generatedSingature !== razorPaySignature) return res.status(400).json({message: "Invalid Payment Signature"})
        if (!user || user.cart.length == 0) return res.status(400).json({
            message: "User cart is eampty"
        })
        const items = user.cart.map(item => ({
            "Product": item.productId._id,
            "quantity": item.quantity,
            "price": item.productId.price
        }))
        const totalAmount = items.reduce((acc, item) => {
            return acc + item.quantity * item.price
        }, 0)

        const order = new Order({
            userId,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod
        })

        await order.save();
        user.cart = [];
        await user.save();
        res.status(201).json({
            status: "success",
            message: "Order place succesfully"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
exports.getOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await Order.find({
            userId
        }).sort({
            createdAt: -1
        });
        if (!orders) return res.status(400).json({
            message: "User does not have Orders"
        })
        res.status(201).json({
            status: "success",
            orders
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}