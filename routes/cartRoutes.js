const express = require("express");
const router = express.Router();
const cartController = require('../controllers/cartController');


const {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity
} = require("../controllers/cartController");
router.get('/cart', cartController.getCart);
router.post("/add", addToCart);
router.get("/", getCart);
router.post("/remove", removeFromCart);
router.post("/update", updateQuantity);

module.exports = router;

