const { body, validationResult } = require("express-validator");



module.exports = {

    email: body('email').notEmpty().bail().trim().isEmail(),
    firstname: body('firstName').notEmpty().bail().trim().escape(),
    lastname: body('lastName',).notEmpty().bail().trim().escape(),
    password: body('password').notEmpty().bail().trim().isStrongPassword({ minLowercase: 1, minUppercase: 1, minSymbols: 1, minLength: 8, minNumbers: 1 }),
    result: (req, res, next) => {
       const report = validationResult(req)
       if(!report.isEmpty()){
            return res.status(400).json({ result: report.array()})
       }
       next()
    }
}