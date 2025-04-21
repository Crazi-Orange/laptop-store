const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const upload = require('../config/multer');

router.get('/profile', authMiddleware, adminController.getProfile);
router.put('/profile', authMiddleware, upload.single('avatar'), adminController.updateProfile);
router.post('/change-password', authMiddleware, adminController.changePassword);

module.exports = router;