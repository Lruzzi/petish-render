const { isValidObjectId } = require("mongoose");
const { sendError } = require("../data/errStatus");
const users = require('../models/users')
const otpModel = require('../models/verifToken')
const { verifyEmailTemplate } = require("../utils/emailTemplate")
const {transporter } = require("../utils/mailer")

async function verifyEmail(req, res){
    const {id, token} = req.query;
    if(!isValidObjectId(id)){
        return sendError(res, 'ID not Found')
    }
    const user = await users.findById(id)
    if(!user){
        return sendError(res, 'User not Found')
    }

    if(user.verified){
        return sendError(res, 'Account has verified already')
    }
    const otp = await otpModel.findOne({owner: user._id})
    if(!otp){
        return sendError(res, 'Verification Request not Found')
    }
    const isMatched = await otp.compareToken(token)
    if(!isMatched){
        return sendError(res, 'OTP is not Valid')
    }
    user.verified = true;

    await otpModel.findByIdAndDelete(otp._id);
    await user.save();
    transporter.sendMail({
        from: 'security@petish.com',
        to: user.email,
        subject: "Petish Account Verified",
        html: verifyEmailTemplate("Now you can Login to Petish")
    })
    res.json({success: true, message: 'Account has been verified'})
}

module.exports = verifyEmail;