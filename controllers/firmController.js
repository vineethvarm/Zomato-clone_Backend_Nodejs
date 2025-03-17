
const Firm = require('../models/Firm');
const Supplier = require('../models/Supplier');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
     cb(null, 'images/'); // Destination folder where the uploaded images will be stored
 },
 filename: function(req, file, cb) {
     cb(null, Data.now() + Path.extname( file.orginalname)); //generating a unique filename
 }
});
const upload = multer ({ storage: storage });


const firmRegister = async (req, res) => {

const supplierId = req.supplierId; // Get supplierId from the request object
try {
const { firmName, location, category, region, offer} = req.body;
const image = req.file? req.file.filename: undefined;

const supplier = await Supplier.findById(req.supplierId);
const supplierExists = await Supplier.findById(supplier);
 if (!supplierExists) {
     return res.status(404).json({ error: "Supplier not found" });
 }

 const newFirm = new Firm({
     firmName,
     location,
     category,
     region,
     offer,
     image,
     supplier: supplierId
 });
 const savedFirm = await newFirm.save();



 // Push the new firm's ID into the supplier's firm array
 supplierExists.firm.push(savedFirm._id);
 await supplierExists.save();

 res.status(201).json({ message: "Firm Registered Successfully" });
} catch (error) {
 console.error(error);
 res.status(500).json({ error: "Internal server error" });
}
};

const deleteFirmById = async(req, res) => {
        try{
            const firmId = req.params.firmId;
    
            const deleteProduct = await Firm.findByIdAndDelete(firmId);
            if(!deleteProduct){
                return res.status(404).json({error: "Product not found"});
            }
        }catch(error)
        {
          console.error(error);
          res.status(500).json({ error: "Internal server error" })
        }
    }

  module.exports = {
    firmRegister: [upload.single('image'), firmRegister], deleteFirmById }