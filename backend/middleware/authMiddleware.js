import asynchandler from "express-async-handler";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import users from '../model/userModel.js'
dotenv.config()
const protect = asynchandler(async (req,res,next)=> {
    let token;
    token = req.cookies.jwt
    if(token){
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET )
            req.user = await users.findById(decoded.userId).select('-password')
            next()
            
        } catch (error) {
            res.status(401)
            throw new Error("Not authorized  invalid token")
        }

    }
    else {
        res.status(401)
        throw new Error('Not authorizes , no TOken')
    }
})
export {protect}