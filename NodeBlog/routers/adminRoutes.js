const express = require("express")
const { adminSignup, adminLogin, getAdminSignUp, getAdminLogin, adminLogout } = require("../controllers/adminController")

let router = express.Router()
router.get("/signup",getAdminSignUp)
router.post("/signup", adminSignup)
router.post("/login", adminLogin)
router.get("/login", getAdminLogin)
router.get("/logout",adminLogout)
module.exports = router
