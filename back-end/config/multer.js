const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

module.exports = multer({
    storage,
    limits: { files: 3 } // Limit to 3 files
});