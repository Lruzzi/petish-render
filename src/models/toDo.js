const mongoose = require("mongoose")
const users = require("./users");

const toDoSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    date: {
        type: Number,
        required: true
    },
    repeat: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('todo', toDoSchema);