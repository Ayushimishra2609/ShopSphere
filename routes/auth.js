const express = require("express");
const router = express.Router();
const User = require("../models/user");
  const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");  // JWT for session management
const authMiddleware = require("../Middleware/authMiddleware");

// ✅ REGISTER Route (POST)
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ❌ Remove hashedPassword — let Mongoose hook handle it
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ LOGIN Route
// LOGIN Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Debug: Log entered password and stored hashed password
    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // Debug: Log password match status
    console.log("Password Match:", isMatch);

    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        userId: user._id,
      },
      token,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ Protected Route (GET)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Profile Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Show Register Form (GET)
router.get("/register", (req, res) => {
  res.render("register");
});

// ✅ Show Login Form (GET)
router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
