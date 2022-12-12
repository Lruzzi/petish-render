const {
    sendError
} = require("../data/errStatus");
const user = require("../models/users");

async function findUser(email, username) {
    var isEmail = await user.find({
        "email": email
    }).count() > 0;
    var isUsername = await user.find({
        "username": username
    }).count() > 0;
    if (isEmail) {
        return ('email');
    } else if (isUsername) {
        return ('username')
    }
    if (isEmail && isUsername) {
        return ('both')
    } else {
        return ('done')
    }
}

async function valUser(isEmail, email, res) {
    if (isEmail) {
        const isUser = await user.findOne({
            email
        })
        if (isUser) {
            return isUser;
        } else {
            return sendError(res, "Email not found");
        }
    } else if (!isEmail) {
        const isUser = await user.findOne({
            "username": email
        })
        if (isUser) {
            return isUser;
        } else {
            return sendError(res, "Username not found");
        }
    } else {
        return sendError(res, "Error Occured")
    }
}

module.exports = {
    findUser,
    valUser
}