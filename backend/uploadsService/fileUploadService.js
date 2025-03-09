require('dotenv').config()
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer config
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
}).single('profilePic'); // 'profilePic' is the name of the file field in your frontend

// Cloudinary upload function with upload_stream
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    console.log("Uploading file:", file);

    const stream = cloudinary.uploader.upload_stream(
      { folder: 'profile_pics', resource_type: 'auto' },
      (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          reject(error);
        } else {
          console.log("Cloudinary upload result:", result);
          if (result && result.public_id) {
            resolve(result);
          } else {
            reject(new Error("Cloudinary upload result doesn't contain 'public_id'"));
          }
        }
      }
    );

    // Use the buffer stream
    stream.end(file.buffer); // End the stream with the buffer
  });
};

module.exports = { upload, uploadToCloudinary };


