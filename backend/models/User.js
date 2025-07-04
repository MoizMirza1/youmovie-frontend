const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's full name
  email: { type: String, required: true, unique: true }, // Unique email
  hashedPassword: { type: String, required: true }, // Store hashed password
  role: { type: String, enum: ["user", "admin"], default: "user" }, // Role management
  profilePic: { type: String, default: "" },
  watchlist: [{ type: String }], 
  isActive: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
}, { timestamps: true }); 


module.exports = mongoose.model("User", userSchema);
