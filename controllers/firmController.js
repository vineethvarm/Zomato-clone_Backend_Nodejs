
const Firm = require('../models/Firm');
const Supplier = require('../models/Supplier');
const multer = require('multer');
const Path = require('path');

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

// Register a new firm
const firmRegister = async (req, res) => {
    const supplierId = req.supplierId; // Get supplierId from the request object
    try {
        const { restaurantName, ownerName, number, location, category, regionalFood, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const supplier = await Supplier.findById(supplierId);
        if (!supplier) {
            return res.status(404).json({ error: "Supplier not found" });
        }
        if(supplier.firm.length > 0){
            return res.status(400).json({message: "for one Supplier only one firm can be added."});
        }

        const newFirm = new Firm({
            restaurantName,
            ownerName,
            number,
            location,
            category,
            regionalFood,
            offer,
            image,
            supplier: supplierId
        });
        const savedFirm = await newFirm.save();

        const firmId = savedFirm._id;

        // Push the new firm's ID into the supplier's firm array
        supplier.firm.push(savedFirm._id);
        await supplier.save();

        res.status(201).json({ message: "Firm Registered Successfully", firmId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete a firm by ID
const deleteFirmById = async (req, res) => {
    try {
        const firmId = req.params.firmId;

        const deleteFirm = await Firm.findByIdAndDelete(firmId);
        if (!deleteFirm) {
            return res.status(404).json({ error: "Firm not found" });
        }

        res.status(200).json({ message: "Firm deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    firmRegister: [upload.single('image'), firmRegister],
    deleteFirmById
};