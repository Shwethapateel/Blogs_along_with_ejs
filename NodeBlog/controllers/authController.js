const { loginWrapper, signupWrapper } = require("../utils/auth.js")
const Author = require("../models/Author.js")

const authorLogin = loginWrapper(Author)
const authorSignup = signupWrapper(Author)
const getAuthorSignUp = (req,res) =>{
    res.render("authorSignup")
}

const getAuthorLogin = (req,res) =>{
    res.render("authorLogin")
}


const authorLogout = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/app/v1/author/login");
}

module.exports = { authorLogin, authorSignup, getAuthorSignUp, getAuthorLogin, authorLogout }
