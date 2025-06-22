const { check } = require("express-validator");
const { getTokenPayload } = require("../services/authService");
const { default: rateLimit } = require("express-rate-limit");




module.exports = {


    loginRateLimiter: rateLimit({

        windowMs: 15*60*1000,
        max: 5,
        message: "Too many connection attemps, Retry in 15 minutes",
        standardHeaders: true,
        legacyHeaders: false,
        keyGenerator: (req) => {
            return req.ip + ":" + req.body.email
        }

    }),

    hasAuthorizationHeader(req, res, next) {
        const { authorization } = req.headers 
        if(!authorization){
            return res.status(401).json({ message: 'missing header'})
        }
        next()
    },

    hasToken(req, res, next){
        if(!req.headers.authorization.startsWith('Bearer ')){
            return res.status(401).json({ message: 'invalid header'})
        }

        const token = req.headers.authorization.split(" ")[1];
        if(!token){
             return res.status(401).json({ message: 'missing token'})
        }
        req.token = token
        next()
    } ,
    isTokenValid(req, res, next) {
        const { token } = req
        try {
            const payload = getTokenPayload(token)
            if(!("email" in payload && "role" in payload)){
                return res.status(401).json({ message: 'invalid token' })
            }
            req.tokenPayload = payload
            next()
        } catch (err) {
            return res.status(401).json({ message: 'invalid token', err})
        }
       
  
    }



}