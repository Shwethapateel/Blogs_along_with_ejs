const express = require("express")
const { authorLogin, authorSignup, getAuthorSignUp, getAuthorLogin, authorLogout } = require("../controllers/authController")

let router = express.Router()
router.get("/signup", getAuthorSignUp)
router.post("/signup", authorSignup)
router.post("/login", authorLogin)
router.get("/login", getAuthorLogin)
router.get("/logout", authorLogout)
module.exports = router
