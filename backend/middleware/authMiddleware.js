const jwt = require("jsonwebtoken");
const User = require("../models/User");


const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } 
  catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};


//admin logic
const adminOnly = (req , res , next) => {
  if (!req.user || req.user.role !== "admin"){
    return res.status(403).json({ message: "Access denied. Admins only!" });
  }
  next()
}

module.exports = {protect , adminOnly} ;
