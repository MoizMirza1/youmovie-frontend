const User = require("../models/User.js");
const Message = require("../models/Chat.js")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { uploadToCloudinary , upload   } = require("../uploadsService/fileUploadService.js")
const { fetchFromTMDB } = require("../services/tmdbService");

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 🚫 Ensure there's only ONE admin account
    if (role === "admin") {
      const existingAdmin = await User.findOne({ role: "admin" });
      if (existingAdmin) {
        return res.status(403).json({ message: "Only limited admin account is allowed" });
      }
    }

    // 🔍 Check if the email already exists
    const userExistsByEmail = await User.findOne({ email });
    if (userExistsByEmail) return res.status(400).json({ message: "Email is already taken" });

    // 🔍 Check if the username already exists
    const userExistsByName = await User.findOne({ name });
    if (userExistsByName) return res.status(400).json({ message: "Username is already taken" });

    // 🔒 Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🛑 Force all new users to be "user" role (even if frontend tries "admin")
    const user = await User.create({
      name,
      email,
      hashedPassword,
      role: "user", // ✅ Enforce "user" role
    });

    // ✅ Send response (exclude password)
    res.status(201).json({
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { loginChoice, password } = req.body;

    // Find the user by email
    const user = await User.findOne({
      $or: [{ email: loginChoice }, { name: loginChoice }] // Match either email or name
    });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

    user.isActive = true;
    await user.save();

    // Send response (exclude password)
    res.json({ 
      user: { _id: user._id, name: user.name, email: user.email, role: user.role }, 
      token: generateToken(user._id) 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.logoutUser = async (req, res) => {
  try {
    const userId = req.user.id;

    // Mark user as inactive on logout
    await User.findByIdAndUpdate(userId, { isActive: false });

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};

exports.uploadProfilePicture = async (req, res) => {
  console.log(req.file);
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    // Upload image to Cloudinary
    const result = await uploadToCloudinary(req.file);

    // Store the image URL in the user's profile
    const userId = req.user.id;  // Assumes the user is authenticated via `req.user`
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePic: result.secure_url },  // Save Cloudinary image URL
      { new: true }
    );

    res.status(200).json({ message: "Profile picture updated successfully", profilePic: user.profilePic });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
};


exports.getAllUsers = async(req,res) => {
  try{
    const users = await User.find({}, "-hashedPassword");
    res.status(201).json(users)
  }
  catch(err){
    res.status(500).json({message : "Error Fetching users" , error : err.message})
  }
}
exports.getActiveUsers = async (req, res) => {
  try {
    const activeUsers = await User.find({ isActive: true }, "-hashedPassword"); // Assuming `isActive` is set to `true` on login
    res.status(200).json(activeUsers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching active users", error: error.message });
  }
};


exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;

    if (!senderId || !receiverId || !text) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newMessage = new Message({ senderId, receiverId, text, timestamp: new Date() });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    }).populate("senderId", "name email").populate("receiverId", "name email");

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
};


exports.getHome = (req, res) => {
  res.json({ message: "Welcome to Home", user: req.user });
};



exports.addWishList = async (req, res) => {
  try {
    const { userId, movieId } = req.body;

    if (!userId || !movieId) {
      return res.status(400).json({ error: "User ID and Movie ID are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if movie is already in watchlist
    if (!user.watchlist.includes(movieId)) {
      user.watchlist.push(movieId);
      await user.save();
      return res.json({ message: "Movie added to watchlist successfully!", watchlist: user.watchlist });
    } else {
      return res.json({ message: "Movie is already in the watchlist.", watchlist: user.watchlist });
    }
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


exports.getWatchlist  = async (req,res) => {
  try {
    const { userId } = req.params;
 
    if (!userId) {
     
        return res.status(400).json({ error: "User ID is required" });
    }
   
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    // Fetch movie details from TMDB for each movieId
    const watchlistDetails = await Promise.all(
        user.watchlist.map(async (movieId) => {
            try {
                return await fetchFromTMDB(`movie/${movieId}`);
            } catch (error) {
                console.error(`Failed to fetch movie ${movieId} from TMDb:`, error);
                return null;
            }
        })
    );

    res.json({ watchlist: watchlistDetails.filter(movie => movie !== null) });
} catch (error) {
    console.error("Error fetching watchlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
}
}

exports.removeFromWatchlist = async (req, res) => {
  try {
    const { userId, movieId } = req.params; // Get userId and movieId from URL params

    if (!userId || !movieId) {
      return res.status(400).json({ error: "User ID and Movie ID are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if movie exists in the watchlist
    const index = user.watchlist.indexOf(movieId);
    if (index !== -1) {
      user.watchlist.splice(index, 1); // Remove movie from watchlist
      await user.save();
      return res.json({ message: "Movie removed from watchlist successfully!", watchlist: user.watchlist });
    } else {
      return res.status(404).json({ error: "Movie not found in watchlist." });
    }
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
