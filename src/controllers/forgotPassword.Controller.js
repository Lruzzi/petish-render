const {
    sendError
} = require("../data/errStatus");
const users = require("../models/users");
const {
    createRandomBytes
} = require("../utils/randBytes");
const {
    generatePasswordReset
} = require("../utils/emailTemplate");
const resetToken = require("../models/resetToken");
const {
    transporter
} = require('../utils/mailer');

async function forgotPassword(req, res) {
    const {
        email
    } = req.body;
    if (!email) {
        return sendError(res, 'Email is empty')
    }
    const user = await users.findOne({
        email
    })
    if (!user) {
        return sendError(res, 'User not found')
    }
    const token = await resetToken.findOne({
        owner: user._id
    });
    if (token) {
        return sendError(res, 'Request Token is available after 5 min.')
    }

    const cryptToken = await createRandomBytes()
    const newToken = new resetToken({
        owner: user._id,
        token: cryptToken
    })
    await newToken.save();
    transporter.sendMail({
        from: 'security@petish.com',
        to: user.email,
        subject: "Petish PASSWORD RESET",
        html: generatePasswordReset(`https://petish-web.onrender.com/petish/reset-password?token=${cryptToken}&id=${user._id}`)
    })
    res.json({
        success: true,
        message: "password reset link has sent to your email"
    })

}

module.exports = forgotPassword;