
const Product = require("../models/Product");
const multer = require("multer");
const Firm = require('../models/Firm');
const mongoose = require('mongoose');
const Path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + Path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
    try {
        const { productName, price, category, description, bestseller } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const firmId = req.params.firmId;

         // Validate firmId
        if (!mongoose.Types.ObjectId.isValid(firmId)) {
            console.error('Invalid firm ID:', firmId);
        return res.status(400).json({ error: 'Invalid firm ID' });
        }

        const firm = await Firm.findById(firmId);
        if (!firm) {
            console.error('Firm not found for ID:', firmId);
            return res.status(404).json({ error: "Firm not found" });
        }

        const product = new Product({
            productName,
            price,
            category,
            description,
            bestseller,
            image,
            firm: firmId
        });

        const savedProduct = await product.save();

        if (!firm.products) {
            firm.products = [];
        }

        firm.products.push(savedProduct);
        await firm.save();

        res.status(200).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getProductByFirm = async (req, res) => {
    try {
        const firmId = req.params.firmId;

        // Validate firmId
        if (!mongoose.Types.ObjectId.isValid(firmId)) {
            return res.status(400).json({ error: "Invalid firm ID" });
        }

        const firm = await Firm.findById(firmId);

        if (!firm) {
            return res.status(404).json({ error: "Firm not found" });
        }

        const restaurantName = firm.restaurantName;
        const products = await Product.find({ firm: firmId });

        res.status(200).json({ restaurantName, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.productId;

         // Validate productId
         if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }

        const deleteProduct = await Product.findByIdAndDelete(productId);
        if (!deleteProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { addProduct: [upload.single('image'), addProduct], getProductByFirm, deleteProductById };

