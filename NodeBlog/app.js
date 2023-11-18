const express = require('express')
const authRoutes = require('./routers/userRouters.js')
const app = express()
app.use(express.json())
app.use('/app/v1/users',authRoutes)
module.exports = app;