const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')
const usersRoutes = require('./app/routes/usersRoutes')
const authRoutes = require('./app/routes/authRoutes')
const filesRoutes = require('./app/routes/filesRoutes')
const cartsRoutes = require('./app/routes/cartsRoutes')
const { connectDB } = require('./app/database/connectDb')
dotenv.config({
    path: path.join(__dirname, ".env")
})

const app = express()

connectDB()



app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '10mb' }))
app.use(cors())

app.use("/api/v1/users", usersRoutes)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/carts", cartsRoutes)
app.use("/static/files", filesRoutes)

app.set('port', process.env.PORT)
app.set('host', process.env.HOST)

module.exports = app