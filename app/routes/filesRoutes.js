const { Router } = require('express')
const path = require('path')
const { getOneById } = require('../controllers/filesController')
const route = Router()

route.get('/photos/:id', getOneById)


module.exports = route

