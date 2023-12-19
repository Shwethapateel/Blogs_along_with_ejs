const { loginWrapper, signupWrapper } = require("../utils/auth.js")
const Admin = require("../models/Admin.js")

const adminLogin = loginWrapper(Admin)
const adminSignup = signupWrapper(Admin)

const getAdminSignUp = (req,res)=>{
    res.render("adminSignup")
}

const getAdminLogin = (req,res) =>{
    res.render("adminLogin")
}

const adminLogout = (req,res) =>{
    res.clearCookie("jwt")
    res.redirect("/app/v1/admin/login")
}

module.exports = { adminLogin, adminSignup, getAdminSignUp, getAdminLogin, adminLogout }