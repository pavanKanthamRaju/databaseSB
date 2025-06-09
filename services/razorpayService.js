const RazorPay = require("razorpay");
require('dotenv').config();
const razorpay = new RazorPay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_SECRET
})
const createOrder = async(amount, currency="Inr", receipt="order_rcptid_001")=>{
const options={
    amount: amount * 100,
    currency,
    receipt
}
return await razorpay.orders.create(options)
}
module.exports = {createOrder}