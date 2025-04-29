const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/user");  // Adjust the path as necessary

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/yourDatabaseName", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

// The new hashed password that you generated
const newHashedPassword = "$2b$10$ReVaOQnra6AkyFGDPQC5Ye8H7tJgLYEYXnmMuMuYp/z.ZbZFoOgZm";

// Update with the correct email address of the user in the database
const userEmail = "test@example.com";  // Replace this with the correct email in your MongoDB

// Find the user by email or userId and update the password
User.findOne({ email: userEmail })  // Ensure this matches the user's email in the database
  .then(user => {
    if (!user) {
      throw new Error("User not found");
    }
    // Update the password field with the new hash
    user.password = newHashedPassword;
    return user.save();  // Save the updated user document
  })
  .then(updatedUser => {
    console.log("Password updated successfully:", updatedUser);
  })
  .catch(err => {
    console.error("Error updating password:", err);
  });
