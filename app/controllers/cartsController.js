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
            
            const oldCart = await Cart.findOne({
                where: {
                    userId: id
                }
            })

            if(oldCart){
                return res.status(400).json({ message: "You already have a cart"})
            }

            const cart = await Cart.create({ content: [], userId: id})
    
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

            return res.status(200).json({ message: "cart destroyed ", numberOfDestroyedRows})

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