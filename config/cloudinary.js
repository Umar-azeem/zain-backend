const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  dotenv.config({ path: './backend/.env' }); 
}

cloudinary.config({
  cloud_name: 'dcijkqinx',
  api_key: '271375388374214',
  api_secret: 'LrbuRxl7t3qjDkSPkgxRbczZbZI',
});

// Optional: Log status for debugging
console.log("Cloudinary ENV Loaded:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? ' Loaded' : 'Missing',
  api_secret: process.env.CLOUDINARY_API_SECRET ? 'Loaded' : 'Missing',
});

module.exports = cloudinary;
