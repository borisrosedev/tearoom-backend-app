const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({
    path: path.join(__dirname, '../../.env')
})

module.exports = {

    createHash(password){
        return bcrypt.hashSync(password, 10)
    },

    isPasswordValid(plain, hash){
        return bcrypt.compareSync(plain,hash)
    },

    generateToken(data){

        return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1000000', algorithm: 'HS256'})
    },

    getTokenPayload(token){
        return jwt.verify(token, process.env.SECRET_KEY)
    }

}