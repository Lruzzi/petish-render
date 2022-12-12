const { check, validationResult} = require("express-validator")

exports.validateUser = [
    check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is Empty"),
    check('email').normalizeEmail().isEmail().withMessage('Email is invalid').withMessage('Email is Empty'),
    check("password").trim()
    .not()
    .isEmpty().withMessage("Password is empty")
    .isLength({min:8}).withMessage("Password must be min 8 characters")
];

exports.validatePet = [
    check("name").trim().not().isEmpty().withMessage("name is empty"),
    check("sex").trim().not().isEmpty().withMessage("Gender is empty"),
    check("type").trim().not().isEmpty().withMessage("Type is empty"),
    check("birthdate").trim().not().isEmpty().withMessage("Birth Date is empty")
];

exports.validateTask = [
    check("title").trim().not().isEmpty().withMessage("Tittle is empty"),
    check("date").trim().not().isEmpty().withMessage("date is empty"),
];

exports.validate = (req, res, next) => {
    const error = validationResult(req).array()
    if(!error.length){
        return next();
    }
    res.status(400).json({success: false, error: error[0].msg})
};