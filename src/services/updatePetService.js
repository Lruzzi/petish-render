const petModel = require("../models/pet")

async function updatePetSer(req, res){
    const {id, name, sex, type, birthdate} = req.body
    try {
        const birthMillies =  new Date(birthdate).getTime()
        let pet = await petModel.findById(id)
        if(!pet) return res.status(404).json({success:false, message: "Pet not found"})
        pet.name = name
        pet.sex = sex
        pet.type = type
        pet.birthdate = birthMillies
        await pet.save()
        return res.status(200).json({success: true, message: "Pet updated successfully", pet: pet})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message: "Internal server error"})
    }
}

module.exports = {updatePetSer};