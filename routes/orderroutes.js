const express= require("express");
const router = express.Router();
const ordercontroller = require("../conrollers/orderController");
const {protect} = require("../middlewares/authMiddleWare")

router.post("/", protect, ordercontroller.placeOrder);
router.get("/", protect, ordercontroller.getOrders);
module.exports=router;