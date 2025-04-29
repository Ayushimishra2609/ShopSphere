let cart = require("./cartController").cart; // if shared cart array

const showCheckout = (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.render("checkout", { cart, total });
};

const confirmOrder = (req, res) => {
  const { name, address, phone } = req.body;
  res.render("thankyou", { name, address, phone });
};

module.exports = { showCheckout, confirmOrder };