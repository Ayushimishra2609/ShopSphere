let cart = []; // ✅ shared cart array

// ✅ Add item to cart
const addToCart = (req, res) => {
  const { name, price } = req.body;
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  res.redirect("/cart");
};

// ✅ View cart
const getCart = (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.render("cart", { cart, total });
};

// ✅ Remove from cart
const removeFromCart = (req, res) => {
  const { name } = req.body;
  cart = cart.filter(item => item.name !== name);
  res.redirect("/cart");
};

// ✅ Update quantity
const updateQuantity = (req, res) => {
  const { name, action } = req.body;
  const item = cart.find(p => p.name === name);
  if (item) {
    if (action === "increase") {
      item.quantity += 1;
    } else if (action === "decrease") {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        cart = cart.filter(p => p.name !== name);
      }
    }
  }
  res.redirect("/cart");
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
  cart // ✅ export shared cart for checkout
};
