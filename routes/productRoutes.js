
const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/addproduct/:firmId', productController.addProduct);
router.get('/:firmId/products', productController.getProductByFirm);

router.get('/images/:imageName', (req, res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', 'image/jpeg');
    res.sendFile(Path.join(__dirname, '../images', imageName));
});

router.delete('/:productId', productController.deleteProductById);

module.exports = router;