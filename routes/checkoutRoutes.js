const express = require("express");
const router = express.Router();
const { showCheckout, confirmOrder } = require("../controllers/checkoutController");

router.get("/", showCheckout);
router.post("/confirm", confirmOrder);

module.exports = router;
