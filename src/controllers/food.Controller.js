const foodModel = require("../models/food")
const {getFoodSer} = require("../services/findFoodService");
const {filterFoodSer} = require("../services/filterFoodService");

async function getFood(res) {
    try {
        const result = await foodModel.find();
        return result;
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        });
    }

}

async function filterFood(req, res) {
    if (!req.body) return res.status(400).json({
        success: false,
        message: "body is empty"
    })
    const result = await filterFoodSer(req, res);
    return result;
}

async function findFood(req, res) {
    const key = req.body;
    if (key.trim()) return res.status(400).json({
        success: false,
        message: "key is empty"
    })
    const result = await getFoodSer(req, res);
    return result;
}

module.exports = {
    filterFood,
    findFood,
    getFood
};