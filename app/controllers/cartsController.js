const dotenv = require("dotenv")
const path = require("path")
const { Cart } = require('../database/models')
const tryCatch = require("../utils/tryCatch")
dotenv.config({
    path: path.join(__dirname, "../../.env")
})


module.exports = {

    async create(req, res){
        
        await tryCatch(async function(){
            const { id } = req.tokenPayload
        
            const cart = await Cart.create({ content: null, userId: id})
    
            return res.status(201).json({ cart })
        }, res)
    },


    async readOneById(req, res) {
        await tryCatch(async function(){

            const { id } = req.tokenPayload
            const cart = await Cart.findOne({
                where: {
                    userId: id
                }
            })

            return res.status(200).json({ cart })

        }, res)
    },


    async deleteOneById(req, res) {
        await tryCatch(async function(){

            const { id } = req.tokenPayload
            const numberOfDestroyedRows = await Cart.destroy({
                where : {
                    userId: id
                }
            })

            return res.status(200).json({ mesage: "cart destroyed ", numberOfDestroyedRows})

        }, res)
    },

    async updateOneById(req, res) {
        await tryCatch(async function(){
            const { id } = req.tokenPayload
            const data = req.body
            const cart = await Cart.findOne({ where: { 
                userId: id
            }})

            const updatedCart = await cart.update({
                content: data
            })

            return res.status(200).json({ cart: updatedCart })

        }, res)
    }

}