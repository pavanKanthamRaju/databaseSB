const Stripe = require("stripe");
const { enabled } = require("../app");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
exports.createPayment = async(amount, currency= "usd")=>{
    return await stripe.paymentIntent.create({
        amount: amount * 100,
        currency,
        automaticPaymentMethods: {
            enabled:true
        }
    });
}