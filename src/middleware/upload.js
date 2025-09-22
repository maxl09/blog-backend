// const multer = require('multer')
// const path = require('path')

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, 'uploads/'),
//     filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
// });

// const upload = multer({ storage })

// exports.upload = upload;

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'posts',       // optional folder in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'dng'],
    },
});

const upload = multer({ storage });

module.exports = upload;
