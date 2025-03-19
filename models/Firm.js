
const mongoose = require('mongoose');

const firmSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    category: {
        type: [
            {
                type: String,
                enum: ['veg', 'non-veg']
            }
        ]
    },
    regionalFood: {
        type: [
            {
                type: String,
                enum: ['continental', 'fast-food', 'north-indian', 'chinese']
            }
        ]
    },
    offer: {
        type: String
    },
    image: {
        type: String
    },
    supplier: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    }],
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

// Create a compound unique index on restaurantName,location, and number
firmSchema.index({ restaurantName: 1, location: 1, number: 1 }, { unique: true });

const Firm = mongoose.model('Firm', firmSchema);

module.exports = Firm;