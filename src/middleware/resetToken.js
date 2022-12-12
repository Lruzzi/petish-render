const {
    isValidObjectId
} = require("mongoose");
const {
    sendError
} = require("../data/errStatus");
const users = require("../models/users")
const resetToken = require("../models/resetToken");
const { compareResetToken } = require("../utils/compareResetToken");

exports.isResetTokenValid = async (req, res, next) => {
    const {
        token,
        id
    } = req.query;
    if (!token || !id) {
        return sendError(res, "Invalid Request")
    }
    if (!isValidObjectId(id)) {
        return sendError(res, "invalid user")
    }

    const user = await users.findById(id)
    if (!user) {
        return sendError(res, "User not found")
    }
    const restToken = await resetToken.findOne({
        owner: user._id
    })
    if (!restToken) {
        return sendError(res, "Reset Token Not Found")
    }
    const isValid = await compareResetToken(token, restToken)
    if (!isValid) {
        return sendError(res, "Reset Token Invalid")
    }
    req.user = user;
    next();
}