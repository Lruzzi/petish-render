const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: { 
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    pet: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('food', foodSchema);
