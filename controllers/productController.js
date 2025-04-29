const getAllProducts = (req, res) => {
  const products = [
    {
      name: 'Smartphone Pro X',
      price: 29999,
      image: 'https://picsum.photos/seed/phone/300/200',
      description: 'Latest model with AMOLED display and 5G',
      category: 'Electronics',
      rating: 4.5
    },
    {
      name: 'Cotton T-Shirt',
      price: 799,
      image: 'https://picsum.photos/seed/tshirt1/300/200',
      description: 'Comfortable cotton round-neck t-shirt',
      category: 'Clothing',
      rating: 4.2
    },
    {
      name: 'Bluetooth Headphones',
      price: 1499,
      image: 'https://picsum.photos/seed/headphones/300/200',
      description: 'Wireless headphones with deep bass',
      category: 'Electronics',
      rating: 4.3
    },
    {
      name: 'Leather Wallet',
      price: 999,
      image: 'https://picsum.photos/seed/wallet/300/200',
      description: 'Premium leather wallet with card slots',
      category: 'Accessories',
      rating: 4.0
    },
    {
      name: 'Running Shoes',
      price: 1999,
      image: 'https://picsum.photos/seed/shoes/300/200',
      description: 'Breathable and lightweight running shoes',
      category: 'Footwear',
      rating: 4.4
    },
    {
      name: "Wireless Earbuds",
      price: 999,
      description: "Bluetooth 5.0, high quality sound",
      category: "Electronics",
      rating: 4.5,
      image: "https://picsum.photos/seed/earbuds/300/200"
    },
    {
      name: "Cotton T-Shirt",
      price: 499,
      description: "Soft and comfortable",
      category: "Fashion",
      rating: 4.2,
      image:  "https://picsum.photos/seed/tshirt2/300/200"
    },
    {
      name: "Ceramic Mug",
      price: 299,
      description: "Perfect for coffee lovers",
      category: "Home",
      rating: 4.8,
      image: "https://picsum.photos/seed/mug/300/200"
    },
    {
      name: "Gaming Keyboard",
      price: 2499,
      description: "Mechanical keyboard with RGB lighting",
      category: "Electronics",
      rating: 4.6,
      image: "https://picsum.photos/seed/keyboard/300/200"
    },
    {
      name: "Office Chair",
      price: 4999,
      description: "Ergonomic chair for long working hours",
      category: "Furniture",
      rating: 4.4,
      image: "https://picsum.photos/seed/chair/300/200"
    },
    {
      name: "Smartwatch Pro",
      price: 3499,
      description: "Fitness tracker with heart rate monitor",
      category: "Electronics",
      rating: 4.5,
      image: "https://picsum.photos/seed/smartwatch/300/200"
    },
    {
      name: "Sunglasses",
      price: 799,
      description: "UV protected stylish sunglasses",
      category: "Accessories",
      rating: 4.1,
      image: "https://picsum.photos/seed/sunglasses/300/200"
    },
    {
      name: "Laptop Sleeve",
      price: 599,
      description: "Protective case for laptops up to 15 inches",
      category: "Accessories",
      rating: 4.3,
      image: "https://picsum.photos/seed/sleeve/300/200"
    },
    {
      name: "Notebook Set",
      price: 199,
      description: "Pack of 3 ruled notebooks",
      category: "Stationery",
      rating: 4.7,
      image: "https://picsum.photos/seed/notebooks/300/200"
    },
    {
      name: "Water Bottle",
      price: 399,
      description: "Stainless steel insulated bottle",
      category: "Home",
      rating: 4.6,
      image: "https://picsum.photos/seed/bottle/300/200"
    },
    {
      name: "Wall Clock",
      price: 899,
      description: "Classic round wall clock",
      category: "Home",
      rating: 4.4,
      image: "https://picsum.photos/seed/clock/300/200"
    },
    {
      name: "Yoga Mat",
      price: 999,
      description: "Non-slip and durable yoga mat",
      category: "Fitness",
      rating: 4.5,
      image: "https://picsum.photos/seed/yogamat/300/200"
    },
    {
      name: "Power Bank",
      price: 1299,
      description: "10000mAh fast charging power bank",
      category: "Electronics",
      rating: 4.6,
      image: "https://picsum.photos/seed/powerbank/300/200"
    },
    {
      name: "Table Lamp",
      price: 699,
      description: "LED desk lamp with brightness control",
      category: "Home",
      rating: 4.3,
      image: "https://picsum.photos/seed/lamp/300/200"
    },
    {
      name: "Backpack",
      price: 1099,
      description: "Water-resistant backpack with laptop compartment",
      category: "Fashion",
      rating: 4.5,
      image: "https://picsum.photos/seed/backpack/300/200"
    }
  ];

  const search = req.query.search?.toLowerCase() || "";
  const category = req.query.category || "all";  // Default is 'all' if no category is provided
  const minPrice = parseFloat(req.query.minPrice) || 0;  // Default is 0 if no min price is provided
  const maxPrice = parseFloat(req.query.maxPrice) || Infinity;  // Default is Infinity if no max price is provided

  // Filtering products based on search term, category, and price range
  const filtered = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search);
    const matchesCategory = category === "all" || product.category.toLowerCase() === category.toLowerCase();
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Ensure these variables are passed to the EJS view
  res.render('product', {
    title: 'All Products',
    products: filtered,
    search: search,
    category: category,
    minPrice: minPrice,
    maxPrice: maxPrice
  });
};

module.exports = { getAllProducts };
