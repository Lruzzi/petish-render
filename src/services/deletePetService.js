const petModel = require("../models/pet")

async function deletePetSer(req, res){
    try {
    const {id} = req.body
        const pet = await petModel.findByIdAndDelete(id)
        return res.status(200).json({success: true, message: "Pet deleted successfully", pet: pet})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"})
    }
}

module.exports = {
    deletePetSer
};