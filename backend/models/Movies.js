const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: [{ type: String, required: true }], // 🔹 Store multiple genres
  releaseDate: { type: Date, required: true },
  duration: { type: Number, required: true }, // 🔹 Duration in minutes
  poster: { type: String, required: true }, // 🔹 Movie poster image URL
  trailerUrl: { type: String }, // 🔹 Optional trailer URL
  director: { type: String },
  cast: [{ type: String }], // 🔹 Array for multiple actors
  language: { type: String, required: true },
  country: { type: String, required: true },
  rating: { type: Number, default: 0 }, // 🔹 Average user rating
  totalRatings: { type: Number, default: 0 }, // 🔹 Number of ratings
  views: { type: Number, default: 0 }, // 🔹 Track total views
  price: { type: Number, default: 0 }, // 🔹 Subscription pricing (if applicable)
  isPremium: { type: Boolean, default: false }, // 🔹 Restrict to premium users
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Movie", MovieSchema);
