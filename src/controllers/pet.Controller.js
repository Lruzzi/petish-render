const petModel = require("../models/pet")
const userModel = require("../models/users")
const {petInputSer} = require("../services/inputPetService")
const {deletePetSer} = require("../services/deletePetService")
const {updatePetSer} = require("../services/updatePetService")


async function petInput(req, res) {
    const user = await userModel.findById(req.user.id);
    if (user) {
        const result = await petInputSer(req, res);
        return result;
    } else {
        return res.json({
            success: false,
            message: "user not found"
        })
    }

}

async function deletePet(req, res) {
    const id = req.body.id
    const isPet = await petModel.findById(id);
    if (!isPet) return res.status(404).json({
        message: "Pet not found"
    })
    const user = await userModel.findById(req.user.id)
    if (!user) return res.status(404).json({
        message: "User not found"
    })
    if (req.user.id !== isPet.owner.toString()) {return res.status(404).json({
        success: false,
        message: "Not Authorized"
    })}
    const result = await deletePetSer(req, res);
    return result;
}

async function updatePet(req, res) {
    const {
        id
    } = req.body
    const isPet = await petModel.findById(id);
    if (!isPet) return res.status(404).json({
        message: "Pet not found"
    })
    const user = await userModel.findById(req.user.id)
    if (!user) return res.status(404).json({
        message: "User not found"
    })
    if (req.user.id !== isPet.owner.toString()) {return res.status(404).json({
        success: false,
        message: "Not Authorized"
    })}

    const result = await updatePetSer(req, res);
    return result;
}

const getPet = async function (req, res) {
    try {
        const {
            id
        } = req.body
        const result = await petModel.findById(id);
        if (!result) {
            return res.status(404).json({
                message: "Pet not found"
            });
        }
        if (req.user.id !== result.owner.toString()) {
            return res.status(404).json({
                success: false,
                message: "Not Authorized"
            })
        }
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        const currentDay = new Date().getDate();

        const year = new Date(result.birthdate).getFullYear();
        const month = new Date(result.birthdate).getMonth();
        const day = new Date(result.birthdate).getDate();

        var umur = 0;
        if(currentYear > year) {
            umur = (currentYear - year) + " " + "tahun";
            if (currentMonth < month || (currentMonth == month && currentDay < day)) {
                umur = (umur-1) + " " + "tahun";
            }
        }
        else {
            if (currentMonth > month) {
                umur = (currentMonth - month) + " " + "bulan";
            }
            else {
                umur = (currentDay - day) + " " + "hari";
            }
        }
        return res.status(200).json({
            success: true,
            message: "Pet found",
            age: umur,
            result

        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        });
    }

}

const getAllPets = async function (req, res) {
    try {
        const result = await petModel.find({owner: req.user.id});
        if (!result) {
            return res.status(404).json({
                message: "Pet not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Pet found",
            result : result
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    petInput,
    deletePet,
    updatePet,
    getPet,
    getAllPets
};