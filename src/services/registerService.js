const {
    sendError
} = require('../data/errStatus');
const { passwordValidation } = require('../middleware/checkPassword');
const check = require('../middleware/findUser');
const user = require('../models/users');
const verTok = require('../models/verifToken');
const { generateEmailTemplate } = require('../utils/emailTemplate');
const { transporter } = require('../utils/mailer');
const {
    createRandomBytes
} = require("../utils/randBytes");

async function registerSer(req, res) {
    const {
        name,
        email,
        username,
        password
    } = req.body;
    
    const strength = await passwordValidation(password)
    if(strength === false){
        return sendError(res, "password is so weak, user capital, lowercase, number, and symbol")
    }
    const isUsed = await check.findUser(email, username);
    if (isUsed === 'done') {
        const newUser = new user({
            name: name,
            email: email,
            username: username,
            password: password
        })
        try{
            const otp = await createRandomBytes();
            const verification = new verTok({
                owner: newUser._id,
                token: otp
            })
            await verification.save();
            await newUser.save();
            var mailOptions = {
                from: 'security@petish.com',
                to: newUser.email,
                subject: 'Petish Email Verification',
                html: generateEmailTemplate(`https://https://petish-back.onrender.com/petish/email-verification?token=${otp}&id=${newUser._id}`)
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.json({success: true, user:{id: newUser._id, name: newUser.name, email: newUser.email, username: newUser.username, verified: newUser.verified}, message:'check email'});
        }
        catch(err){
             res.send(err)};
    } else if (isUsed == 'email') {
        return sendError(res, "Email is already used")
    } else if (isUsed == 'username') {
        return sendError(res, "Username is already used")
    } else if (isUsed == 'both') {
        return sendError(res, "Email and Username is already used")
    } else {
        return sendError(res, "Crash Ocured")
    }
}

module.exports = {registerSer};