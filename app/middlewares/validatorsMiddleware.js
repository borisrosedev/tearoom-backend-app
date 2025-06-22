const { body, validationResult } = require("express-validator");
const path = require('path')
const fs = require('fs')


module.exports = {

    email: body('email').notEmpty().bail().trim().isEmail(),
    firstname: body('firstName').notEmpty().bail().trim().escape(),
    lastname: body('lastName',).notEmpty().bail().trim().escape(),
    password: body('password').notEmpty().bail().trim().isStrongPassword({ minLowercase: 1, minUppercase: 1, minSymbols: 1, minLength: 8, minNumbers: 1 }),
    result: (req, res, next) => {
       const report = validationResult(req)
    
       if(!report.isEmpty()){

            const fileToRemove = path.join(__dirname, "../../uploads", req.file.filename)
        
            fs.rm(fileToRemove, (err) => {
                if (err) {
                    console.error("Erreur de suppression :", err);
                } else {
                    console.log("Fichier supprimé :", req.file.filename);
                }
            });
            return res.status(400).json({ result: report.array()})
       }
       next()
    }
}