const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');
const upload = require('../config/multer');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', authMiddleware, upload.array('images', 3), productController.createProduct);
router.put('/:id', authMiddleware, upload.array('images', 3), productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;