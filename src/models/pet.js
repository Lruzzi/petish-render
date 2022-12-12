const mongoose = require("mongoose")
const users = require("./users");

const petSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    name: {
        type: String,
        required: true,

    },
    sex:{
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    birthdate: {
        type: Number,
        required: true
        }
});

module.exports = mongoose.model('pet', petSchema);