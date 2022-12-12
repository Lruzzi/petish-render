const {loginSer} = require('../services/loginService');
const {registerSer} = require('../services/registerService');
const User = require("../models/users");
const asyncHandler = require("express-async-handler");

async function register(req, res) {
    const result = await registerSer(req, res)
    return result;
};

async function login(req, res) {
    try{
        const result = await loginSer(req,res);
        return result;
    }
    catch(err){
        return(err);
    }
};

const getMe = asyncHandler(async (req, res) => {
    const {_id, name, username, email} = await User.findById(req.user.id);
    res.status(200).json({success:true, data:{_id, name, username, email}});
});

module.exports = {
    register,
    login,
    getMe
}