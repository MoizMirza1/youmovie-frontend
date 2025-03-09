const express = require("express");
const { registerUser, loginUser, getHome, uploadProfilePicture,getActiveUsers ,getAllUsers, logoutUser, sendMessage , getMessages ,addWishList , getWatchlist ,removeFromWatchlist  } = require("../controller/Controller");
const { upload } = require("../uploadsService/fileUploadService")
const {protect , adminOnly} = require("../middleware/authMiddleware");
const router = express.Router();

const Message = require("../models/Chat.js")

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);

router.get("/home", protect, getHome);

// Make sure the upload middleware is called before the uploadProfilePicture controller
router.post('/uploadProfilePic', protect, upload, uploadProfilePicture);


//admins Route

router.get("/admin" , protect , adminOnly , (req, res) => {
    res.json("Welcome to admin area You are admin !!")
})


// get Route 

// router.get("/users", protect, adminOnly, getAllUsers);
// router.get("/active-users", protect, getActiveUsers);

router.get("/users",  getAllUsers);
router.get("/active-users", getActiveUsers);


router.post("/chat/send",  sendMessage); // ✅ Send a message
router.get("/:senderId/:receiverId", protect, getMessages);


router.get("/messages/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const messages = await Message.find({ $or: [{ senderId: userId }, { receiverId: userId }] }).sort({ createdAt: 1 });
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Error fetching messages", error });
    }
  });



  router.post("/watchlist/add" , addWishList)
  router.get("/see/watchlist/:userId",  getWatchlist);

  router.delete("/remove/watchlist/:userId/:movieId", removeFromWatchlist);



module.exports = router;
