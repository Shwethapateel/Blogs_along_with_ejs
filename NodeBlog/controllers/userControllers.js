const { loginWrapper, signupWrapper} = require('../utils/auth.js')
const User = require("../models/User.js")

const login = loginWrapper(User)
const signup = signupWrapper(User)

const getUserSignUp = (req,res)=>{
    res.render("userSignup")
}

const getUserLogin = (req,res) =>{
    res.render("userLogin")
}

const userLogout = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/app/v1/users/login");
}

module.exports = { login, signup, getUserSignUp, getUserLogin, userLogout}