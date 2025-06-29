const express = require('express')
const router = express.Router();
const cartController = require("../conrollers/cartController");
const {
    protect
} = require("../middlewares/authMiddleWare");


router.post("/add", protect, cartController.addToCart);
router.delete("/remove/:productId", protect, cartController.removeFromCart);
router.get("/:userId", protect, cartController.getcart);

module.exports = router;