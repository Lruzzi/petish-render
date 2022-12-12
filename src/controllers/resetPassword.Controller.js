const { sendError } = require("../data/errStatus")
const { passwordValidation } = require("../middleware/checkPassword")
const resetToken = require("../models/resetToken")
const users = require("../models/users")
const { plainrestsucTemplate } = require("../utils/emailTemplate")
const compare = require('../utils/comparePass');
const { transporter } = require("../utils/mailer")

async function resetPassword(req, res){
    const{password} = req.body

    const user = await users.findById(req.user._id)
    if(!user) {
        return sendError(res, "User not found")
    }
    const isUser = user;
    const isSame = await compare.comparePassword(password, isUser)
    if(isSame){
        return sendError(res, 'Password is same as before')
    }

    const strength = await passwordValidation(password);
    if(strength === false){
        return sendError(res, 'Password must contain at least 1 capita, 1 lower, 1 number, and 1 symbol')
    }
    user.password = password;
    await user.save();
    await resetToken.findOneAndDelete({owner: user._id});
    transporter.sendMail({
        from: 'security@petish.com',
        to: user.email,
        subject: "Petish PASSWORD RESET SUCCESSFULL",
        html: plainrestsucTemplate("Now you can login with new password!")
    })
    res.json({success: true, message: "Reset Passowrd Success"})

}

module.exports =  resetPassword