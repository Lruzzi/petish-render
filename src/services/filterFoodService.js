const foodModel = require("../models/food")

async function filterFoodSer(req, res){
    try {
        const filter = req.body
        const result = await foodModel.find(filter);
        return result;
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"});
    }
    
}

module.exports = {
    filterFoodSer
}