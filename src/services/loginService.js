const {
    sendError
} = require('../data/errStatus');
const emVal = require('../middleware/emailVal');
const compare = require('../utils/comparePass');
const userfind = require('../middleware/findUser');
const jwt = require('jsonwebtoken');

async function loginSer(req, res) {
    const {
        email,
        password
    } = req.body;
    if (!email.trim() || !password.trim()) {
        return sendError(res, "Email/password is empty!");
    } else {
        const isEmail = await emVal.emailValidation(email);
        const isUser = await userfind.valUser(isEmail, email, res);
        if(isUser){
            const isMatch = await compare.comparePassword(password, isUser)
            if (isMatch === true) {
                const tokenj = jwt.sign({
                    userId: isUser._id
                }, process.env.JWT_SECRET, {
                    expiresIn: "30d"
                })
                res.json({
                    success: true,
                    user: {
                        name: isUser.name,
                        email: isUser.email,
                        id: isUser._id,
                        token: tokenj
                    }
                })
            } else {
                return sendError(res, 'Wrong Password')
            }   
        }
        else{
            return sendError(res, "User Not Found")
        }
        
    }
}

module.exports = {
    loginSer
}