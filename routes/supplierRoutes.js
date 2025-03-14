
const supplierController = require('../controllers/SupplierController');
const express = require('express');

const router = express.Router();

router.post('/register', supplierController.supplierRegister);
router.post('/login', supplierController.supplierLogin)

router.get('/allsuppliers', supplierController.getAllSuppliers);
router.get('/onesupplier/:id', supplierController.getSupplierById);

module.exports = router;