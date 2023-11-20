const User = require('../models/User.js')
const jwt = require('jsonwebtoken')

const genToken = async (id) =>{
  return await jwt.sign({id:id}, process.env.JWT_SECRET,{expiresIn : 24*60*60})
}

const signup = async(req,res)=>{
    try {
        ////verify if user is persent already
        const existingUser = await User.findOne({email : req.body.email})
        if(existingUser){
            return res.status(401).json({
                status : 'fail',
                message : 'User exists already, Please try loggining in'
            })
        }
        const newUser = await User.create(req.body)
        const token = await genToken(newUser._id)
        res.status(201).json({
          status: "success",
          token,
          data : {
            newUser
          }
        });
    } catch (error) {
        res.status(400).json({
          status: "fail",
          message: error.message,
        });
    }
}

const login = async(req,res)=>{
  try {
    if(!req.body.email || !req.body.password){
      return res.status(400).json({
        status : 'fail',
        message : 'Please enter Credentials'
      })
    }
    const existingUser = await User.findOne({email:req.body.email})
    if(!existingUser || !(await existingUser.comparePassword(req.body.password , existingUser.password))){
      return res.status(400).json({
        status:'Fail',
        message: "User name and password is not correct"
      })
    }
    // const isMatch = await existingUser.comparePassword(req.body.password , existingUser.password)  
    // console.log(isMatch);   /////this isMatch will return boolean
    const token = await genToken(existingUser._id);
    res.status(200).json({
      status : 'success',
      token,
      data : {
        existingUser
      }
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}

module.exports = {signup, login}