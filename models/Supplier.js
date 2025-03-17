
const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
     username:{
        type: String,
        required: true
     },
     email:{
        type: String,
        required: true,
        unique: true
     },
     password:{
        type: String,
        required: true
     },
     firm:[
      {
         type: mongoose.Schema.Types.ObjectId,
         ref:'Firm'
     }
   ]
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
 