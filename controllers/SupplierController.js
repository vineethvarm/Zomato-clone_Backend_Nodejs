
const Supplier = require('../models/Supplier');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');

dotEnv.config();

const secretKey = process.env.WhoAreYou





const supplierRegister = async(req, res)=>{
         const {username, email, password} = req.body;
         try {
             const supplierEmail = await Supplier.findOne({email});
             if(supplierEmail) {
                 return  res.status(400).json("Email already Exists");
            }
            const supplierusername = await Supplier.findOne({username});
            if(supplierusername) {
                return  res.status(400).json("Try other email");
           }
            const hashedPassword = await bcrypt.hash(password, 10);

            const newSupplier = new Supplier({
                username,
                email,
                password: hashedPassword
            });
            await newSupplier.save();

            res.status(201).json({message:"Registered Successfully"});
            console.log('registered')

         }catch(error) {
            console.error(error);
             res.status(500).json({error:"Internal server error"})

         }

}

const supplierLogin = async(req, res)=>{
       const {email, password} = req.body;
try {
       const supplier = await Supplier.findOne({email})
       if(!supplier || !(await bcrypt.compare(password, supplier.password))) {
        return res.status(401).json({error: "Invalid username or Password please check your username or password"})
       }
       const token =
         jwt.sign({ supplierId: supplier._id }, secretKey, { expiresIn: '1h' })

       res.status(200).json({success: "Login successfull", token})
       console.log(email, "This is token", token);
} catch (error) {
    console.log(error);
    res.status(500).json({ error:  "Internal server error" });
}
}


module.exports = { supplierRegister, supplierLogin }
           