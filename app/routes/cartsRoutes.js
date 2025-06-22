const { Router } = require('express')
const { create, updateOneById, deleteOneById, readOneById } = require('../controllers/cartsController')
const authMiddleware = require('../middlewares/authMiddleware')

const route = Router()

route.get('/me',    
    authMiddleware.hasAuthorizationHeader, 
    authMiddleware.hasToken, 
    authMiddleware.isTokenValid,
    readOneById
)


route.get('/',    
    authMiddleware.hasAuthorizationHeader, 
    authMiddleware.hasToken, 
    authMiddleware.isTokenValid,
    create
)


route.put('/',    
    authMiddleware.hasAuthorizationHeader, 
    authMiddleware.hasToken, 
    authMiddleware.isTokenValid,
    updateOneById
)

route.delete('/',     
    authMiddleware.hasAuthorizationHeader, 
    authMiddleware.hasToken, 
    authMiddleware.isTokenValid,
    deleteOneById
)


module.exports = route