
const express = require('express');
const firmController = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/addfirm', verifyToken, firmController.firmRegister);

router.get('/images/:imageName', (req, res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', 'image/jpeg');
    res.sendFile(Path.join(__dirname, '../images', imageName));
});

router.delete('/:firmId', firmController.deleteFirmById);

module.exports = router;