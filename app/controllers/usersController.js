const { generateToken } = require("../services/authService")
const { User } = require('../database/models')
const tryCatch = require("../utils/tryCatch")
const dotenv = require("dotenv")
const path = require("path")
dotenv.config({
    path: path.join(__dirname, "../../.env")
})

module.exports = {

    async create(req, res){

        const { firstName, lastName, email, password } = req.body 
   
  
        await tryCatch(async function(){
            const newUser = await User.create({ firstName, lastName, email, password, photo: req.file.filename })
            
            return res.status(201).json({ user : newUser })
        }, res)

    },


    async readAll(req, res){
        const { email } = req.tokenPayload 
        if(!email == process.env.ADMIN_EMAIL){
            return res.status(401).json({ message: "invalid data"})
        }

        await tryCatch( async function(){
            const users = await User.findAll({include: [{all: true }]})
            res.status(200).json(users)
        }, res)

    },

    async readOneByEmail(req, res){
        const { email } = req.tokenPayload


        await tryCatch(async function(){
            const user = await User.findOne({
                where: { email: email }, include: [{all: true }],
            })
            return res.status(200).json({ user })
        }, res)

    },

    async updateOneByEmail(req, res) {
        const { email, role } = req.tokenPayload

        await tryCatch(async function(){

            const data = req.body 
            const user = await User.findOne({ 
                where: {
                    email: email
                }
            })

            await user.update({ ...data, role: "user" })
            return res.status(200).json({ user })
        }, res)

    },

    async deleteOneByEmail(req, res){
        const { email, role } = req.tokenPayload


        await tryCatch(async function(){
            const numberOfDestroyedRows = await User.destroy({
                where: {
                    email: email
                }
            })

            return res.status(200).json({ mesage: "user destroyed ", numberOfDestroyedRows})
        }, res)
    }

}