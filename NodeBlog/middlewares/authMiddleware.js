const jwt = require('jsonwebtoken')
const User = require('../models/User.js')
const asyncErrorHandler = require('../utils/asyncErrorHandler.js')
const CustomError = require('../utils/CustomError.js')
const Admin = require('../models/Admin.js')
const Author = require("../models/Author.js")

const auth = asyncErrorHandler (async (req, res, next) =>{
    // let testToken = req.headers.authorization
    // let token;
    // if(testToken && testToken.startsWith("Bearer")){
    //     token = testToken.split(" ")[1]
    // }
    let token = req.cookies.jwt
    if(!token){
        const err = CustomError(401, "Try logging in, to access")
        return next(err)
    }
    const decodedToken =await jwt.verify(token, process.env.JWT_SECRET)
    let Models = [User, Admin, Author]
    let users = Models.map(async (Model) => {
        let users = await Model.findById(decodedToken.id)
        return users
    })
    users = await Promise.all(users)
    let authorizedUser = users.filter((doc) => doc !== null)
    if(!authorizedUser[0]){
        const err = new CustomError(401, "user no longer exists")
        return next(err)
    }
    req.user = authorizedUser[0]
    next()
})

const verifyRole = (role) =>{
    return (req,res,next)=>{
        if(!role.includes(req.user.role)){
            const err =new CustomError(401, "You are not authorized")
            return next(err)
        }
        // console.log(req.user.role)
        next()
    }
}

module.exports = {auth, verifyRole}