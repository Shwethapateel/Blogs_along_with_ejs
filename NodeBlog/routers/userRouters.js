const express = require('express')
const {signup,login, getUserSignUp, getUserLogin, userLogout} = require('../controllers/userControllers.js')
let router = express.Router()
router.get("/signup", getUserSignUp)
router.post('/signup',signup)
router.post("/login", login)
router.get("/login", getUserLogin)
router.get("/logout", userLogout)
module.exports = router