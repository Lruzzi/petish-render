const foodModel = require("../models/food")

async function getFoodSer(req, res){
    try {
        const key = req.body
        const result = await foodModel.find(key);
        return result;
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"});
    }
    
}

module.exports = {
    getFoodSer
}