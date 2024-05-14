const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;


const dotenv = require('dotenv');
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Function to generate a unique filename
const generateUniqueFilename = () => {
  const uniqueString = Math.random().toString(36).substring(2, 8);
  return `image-${uniqueString}`;
};

// Configure Cloudinary storage with filename customization
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'uploads',
      allowedFormats: ['jpg', 'jpeg', 'png'],
      transformation: [{ width: 500, height: 500, crop: 'limit' }],
    //   filename: (req, file, cb) => {
    //     // Correct way to call cb: pass null (no error) as the first argument and the generated filename as the second argument
    //     cb(null, generateUniqueFilename());
    //   }
    }
  });

// Create Multer instance with Cloudinary storage
const cloudinaryHelper = multer({ storage: storage });

module.exports = {
  cloudinaryHelper,
};
