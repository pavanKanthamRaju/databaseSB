const express = require("express");
const router = express.Router();
const ordercontroller = require("../conrollers/orderController");
const {
    protect
} = require("../middlewares/authMiddleWare");
const paymentController = require("../conrollers/paymentController")

router.post("/", protect, ordercontroller.placeOrder);
router.get("/", protect, ordercontroller.getOrders);
router.post("/createPaymentIntent", protect, paymentController.createPayment);
module.exports = router;