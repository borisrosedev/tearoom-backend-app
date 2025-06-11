const { generateToken, isPasswordValid } = require("../services/authService")
const { User } = require('../database/models')
const tryCatch = require("../utils/tryCatch")


module.exports = {



    async login(req, res){
        const { email, password } = req.body

        await tryCatch(async function(){

            const user = await User.findOne({
                where: {
                    email: email
                }
            })

         
            if(!user){
                return res.status(401).json({ message: 'invalid data'})
            }

            const isValid = isPasswordValid(password, user.password)

            if(!isValid){
                return res.status(401).json({ message: 'invalid data'})
            }

            const token = generateToken({ email: user.email , role : user.role, id: user.id })
            console.log(token)
            return res.status(201).json({ token })
        }, res)


    
     
    }

}