const express = require("express")
const router = express.Router();
const productController = require("../conrollers/productController")

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProducrtById);
router.post("/", productController.createProduct)

module.exports = router