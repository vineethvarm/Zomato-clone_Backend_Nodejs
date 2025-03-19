
const express = require('express');
const firmController = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');
const Path = require('path');

const router = express.Router();

// Route to add a new firm
router.post('/addfirm', verifyToken, firmController.firmRegister);

// Route to serve images
router.get('/images/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.set('Content-Type', 'image/jpeg');
    res.sendFile(Path.join(__dirname, '../images', imageName));
});

// Route to delete a firm by ID
router.delete('/:firmId', verifyToken, firmController.deleteFirmById);

module.exports = router;