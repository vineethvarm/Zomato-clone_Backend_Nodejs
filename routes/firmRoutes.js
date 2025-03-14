
const express = require('express');
const firmController = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/addfirm', verifyToken, firmController.firmRegister);

module.exports = router;