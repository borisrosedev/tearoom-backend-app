const { Router } = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { create, readOneByEmail, updateOneByEmail, deleteOneByEmail, readAll } = require('../controllers/usersController')
const { email, result, password, firstname, lastname } = require('../middlewares/validatorsMiddleware')
const upload = require('../middlewares/multerMiddleware')

const route = Router()

route.get('/me', 
    authMiddleware.hasAuthorizationHeader, 
    authMiddleware.hasToken, 
    authMiddleware.isTokenValid, 
    readOneByEmail
)


route.get('/',    
    authMiddleware.hasAuthorizationHeader, 
    authMiddleware.hasToken, 
    authMiddleware.isTokenValid, 
    readAll
)

route.put('/',   
    authMiddleware.hasAuthorizationHeader, 
    authMiddleware.hasToken, 
    authMiddleware.isTokenValid, 
    updateOneByEmail
)


route.delete('/',   
    authMiddleware.hasAuthorizationHeader, 
    authMiddleware.hasToken, 
    authMiddleware.isTokenValid, 
    deleteOneByEmail
)


route.post('/', upload.single('photo'),  firstname, lastname, email, password, result,  create)

module.exports = route