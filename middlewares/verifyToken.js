
const Supplier = require('../models/Supplier');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

dotEnv.config()

const secretKey = process.env.WhoAreYou


const verifyToken = async(req, res, next) =>{
    const token = req.headers.token;

    if(!token){
        return res.status(401).json({error: "Token is required"});
    }
    try {
        const decoded = jwt.verify(token, secretKey)
        const supplier = await Supplier.findById(decoded.supplierId);

        if(!supplier){
            return res.status(404).json({error: "supplier not found"})
        }

        req.supplierId = supplier._id
 
        next()
    } catch (error) {
        console.error(error)
            return res.status(500).json({error: "Invalid token"})
    }

}

module.exports = verifyToken

