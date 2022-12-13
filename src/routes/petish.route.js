const express = require('express');
const router = express.Router();
require('../configs/db.config')

const {
    validateUser,
    validatePet,
    validate,
    validateTask
} = require("../middleware/validator")

const verifyEmail = require('../controllers/verifToken.Controller');
const forgotPassword = require('../controllers/forgotPassword.Controller');
const {isResetTokenValid} = require('../middleware/resetToken');
const resetPassword = require('../controllers/resetPassword.Controller');
const {protect} = require('../middleware/authMiddleware');
const { getNotify } = require('../controllers/getNotify.Controller');
const { inputTask, updateTask, deleteTask, getTask, getTaskToday, getAllTask } = require('../controllers/toDo.Controller');
const { petInput, updatePet, deletePet, getPet, getAllPets } = require('../controllers/pet.Controller');
const { register, login, getMe } = require('../controllers/user.Controller');
const { getFood, findFood, filterFood } = require('../controllers/food.Controller');

//register procedure
router.post("/register", validateUser, validate, register);
router.post("/email-verification", verifyEmail)

//login
router.post("/login", login)

//get me
router.get("/me", protect, getMe)


//Forgot Password procedure
router.post("/forgot-password", forgotPassword)
router.post("/reset-password",isResetTokenValid, resetPassword)
router.get("/verify-token", isResetTokenValid, (req, res)=> {
    res.json({success: true})
})

//Pet Information
router.post("/input-pet", protect, validatePet, validate, petInput)
router.put("/update-pet", protect, validatePet, validate, updatePet)
router.delete("/delete-pet", protect, deletePet)
router.post("/get-pet", protect, getPet)
router.get("/get-all-pet", protect, getAllPets)

//Task
router.post("/input-task", protect, validateTask, validate, inputTask)
router.put("/update-task", protect, validateTask, validate, updateTask)
router.delete("/delete-task", protect, deleteTask)
router.post("/get-task", protect, getTask)
router.get("/get-notif", protect, getNotify)
router.get("/get-task-today", protect, getTaskToday)
router.get("/get-all-task", protect, getAllTask)

//food
router.get("/get-food", getFood)
router.get("/find-food", findFood)
router.get("/filter-food", filterFood)

module.exports = router;