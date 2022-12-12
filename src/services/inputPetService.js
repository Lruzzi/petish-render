const petModel = require("../models/pet")

async function petInputSer(req, res){
    const {name, sex, type, birthdate} = req.body
    const owner = req.user.id
    try{
        let birthMillies = new Date(birthdate).getTime();
        const pet = new petModel({
            owner: owner,
            name: name,
            sex: sex,
            type: type,
            birthdate: birthMillies
        })
        await pet.save()
        res.json({success:true, pet:{id: pet._id, owner: pet.owner, name: pet.name, sex: pet.sex, type: pet.type, birthdate: pet.birthdate}, message:'input pet information success'})
    }catch(err){
        console.log(err)
        res.json({success:false, message: err})
    }

}

module.exports = {
    petInputSer
}