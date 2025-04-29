const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity
} = require("../controllers/cartController");

router.post("/add", addToCart);
router.get("/", getCart);
router.post("/remove", removeFromCart);
router.post("/update", updateQuantity);

module.exports = router;

