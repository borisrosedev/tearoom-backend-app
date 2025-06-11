const { Router } = require('express')
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

const route = Router()


route.post('/login',  authMiddleware.loginRateLimiter, authController.login)

module.exports = route