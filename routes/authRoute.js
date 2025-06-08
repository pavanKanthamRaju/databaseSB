const express =require("express");
const router = express.Router();
const authController = require("../conrollers/authController");

router.post("/login",authController.login);
router.post("/register", authController.register)

module.exports = router;