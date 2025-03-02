
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
     }
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
 