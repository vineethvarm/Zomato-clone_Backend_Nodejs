
const mongoose = require('mongoose');

const firmSchema = new mongoose.Schema({
    firmName:{
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true,
    },
    category: {
        type: [
            {
                type:String,
                enum : ['veg','non-veg']
            }
        ]
    },
    region:{
        type:[
            {
              type:String,
              enum: ['south-indian','north-indian','chinese','bakery','starters']
            }
        ]
    },
    offer:{
        type:String,
    },
    image:{
        type: String,
    },
    supplier: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    }],
    products: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref:'Product'
     }
    ]
});

const Firm = mongoose.model('Firm', firmSchema);

module.exports = Firm