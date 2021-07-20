////////////////// requirement install packages////////////////////
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

/////////////////////// configuration//////////////////////////

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
/////////////////// storage/////////////////////////////////
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "folder-name",
    allowedFormats: ["jpg", "png", "svg", "mp4"],
    resource_type: "auto",
    public_id: (req, file) => file.originalname,
  },
});


const uploadCloud = multer({ storage });

module.exports = uploadCloud;