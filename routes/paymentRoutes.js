const express = require("express");
const router = express.Router();

const {
    protect
} = require("../middlewares/authMiddleWare");
const paymentController = require("../conrollers/paymentController")

router.post("/createPaymentIntent", protect, paymentController.createPayment);
module.exports = router;