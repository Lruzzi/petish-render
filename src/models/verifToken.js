const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const users = require("./users");

const verifTokenSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    token: {
        type: String,
        required: true,

    }
});

verifTokenSchema.pre('save', async function (next) {
    if (this.isModified('token')) {
        const hash = await bcrypt.hash(this.token, 10)
        this.token = hash;
    }
    next()
});

verifTokenSchema.methods.compareToken = async function (token) {
    const result = await bcrypt.compareSync(token, this.token);
    return result;
}

module.exports = mongoose.model('verifToken', verifTokenSchema);