
const Supplier = require('../models/Supplier');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



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

module.exports = { supplierRegister }
           