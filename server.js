require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI);
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cartController = require('./controllers/cartController'); // Correct import
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartroutes');
const bcrypt = require("bcrypt");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

// Home Route
app.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to ShopSphere!' });
});

// Checkout Route: Show Cart and Checkout Page
app.get('/checkout', cartController.showCheckout); // Checkout page dikhana

// Checkout Confirmation Route: Confirm Order
app.post('/checkout', cartController.confirmOrder); // Order confirm karna

// MongoDB Connection
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('🚫 MONGO_URI not found in .env file');
    }
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Stop the app if DB fails to connect
  }
};

// Start server
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running successfully on port ${PORT}`);
  });
});
