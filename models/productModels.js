const mongoose = require('mongoose');

// Define product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, required: true },
}, { timestamps: true });

// Create a model from the schema
const Product = mongoose.model('Product', productSchema);

// Exporting the Product model
module.exports = Product;
