const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const users = require("./users");

const resetTokenSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    token: {
        type: String,
        required: true,

    },
    createdAt: {
        type: Date,
        expires: 300,
        default: Date.now()
    }
});

resetTokenSchema.pre('save', async function (next) {
    if (this.isModified('token')) {
        const hash = await bcrypt.hash(this.token, 10)
        this.token = hash;
    }
    next()
});

resetTokenSchema.methods.compareToken = async function (token) {
    const result = await bcrypt.compareSync(token, this.token);
    return result;
}

module.exports = mongoose.model('resetToken', resetTokenSchema);