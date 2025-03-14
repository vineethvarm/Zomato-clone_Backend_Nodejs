
const supplierController = require('../controllers/SupplierController');
const express = require('express');

const router = express.Router();

router.post('/register', supplierController.supplierRegister);
router.post('/login', supplierController.supplierLogin)

module.exports = router;