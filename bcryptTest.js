const bcrypt = require('bcryptjs');

const password = '1234!@#$';  // Example entered password
const storedHash = '$2b$10$IZSxxj0vCn3yguZncngW0OxaG9TfJBoslGkNmBX7qWOZGs..SOmtO';  // Example stored hash

bcrypt.compare(password, storedHash)
  .then((result) => {
    console.log("Password match:", result);  // Should log true if passwords match
  })
  .catch(err => {
    console.error("Error:", err);
  });
