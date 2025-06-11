const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({
    path: path.join(__dirname, '../../.env')
})


const sequelizeClient = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres'
})



async function connectDB(){
    try {
        await sequelizeClient.authenticate()
        console.log('🚩 Connection à la bdd réussie')
    } catch (err){
        console.log('❌ Erreur de connextion avec la bdd', err)
    }
}




module.exports = { sequelizeClient, connectDB }





