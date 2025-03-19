
const Product = require("../models/Product");
const multer = require("multer");
const Firm = require('../models/Firm');
const Path = require("path");


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'images/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
      cb(null, Data.now() + Path.extname( file.orginalname)); //generating a unique filename
    }
});

const upload = multer ({ storage: storage });

const addProduct = async (req, res)=>{
     try {
        const {productName, price, category, description, rating} = req.body;
        const image = req.file ? req.file.filename : undefined;

        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if(!firm){
            return res.status(404).json({error:"firm not found"});
        } 
        const product = new Product({
            productName,
            price,
            category,
            description,
            rating,
            image,
            firm: firm._id
        })

        const savedProduct = await product.save();

        if (!firm.products) {
          firm.products = [];
        }
        
        firm.products.push(savedProduct);
        await firm.save()

        res.status(200).json(savedProduct)
     } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
        
     }
}

const getProductByFirm = async(req, res) => {
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if(!firm) {
        return res.status(404).json({ error:"firm not found"});
        }
            
        const restaurantName = firm.firmName;
        const products = await Product.find({ firm: firmId});      

        res.status(200).json({ restaurantName, products});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

const deleteProductById = async(req,res)=>{
    try{
        const productId = req.params.productId;

        const deleteProduct = await Product.findByIdAndDelete(productId);
        if(!deleteProduct){
            return res.status(404).json({error: "Product not found"});
        }
    }catch(error)
    {
      console.error(error);
      res.status(500).json({ error: "Internal server error" })
    }
}

module.exports =  { addProduct: [upload.single('image'), addProduct], getProductByFirm, deleteProductById};