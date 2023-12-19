const express = require("express")
const authRoutes = require("./routers/userRouters.js")
const adminRoutes = require("./routers/adminRoutes.js")
const authorRoutes = require("./routers/authorRouter.js")
const cookiesSession = require("cookie-session")
const BlogRouter = require("./routers/BlogRoutes.js")
const globalErrorController = require("./controllers/globalErrorController.js")
const CustomError = require("./utils/CustomError.js").default
const flash = require("connect-flash")
const cookieParser = require("cookie-parser")
const app = express()
//to register template engine
app.set("view engine", "ejs")
app.use(
  cookiesSession({
    name : "session",
    keys : ["your-secret-key"],
    maxAge : 24 * 60 * 60 * 1000    //24 hours
  })
)
app.use(flash())
app.use((req,res,next) =>{
  res.locals.success = req.flash("success")[0]
  res.locals.error = req.flash("error")[0]
  next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))

app.use(cookieParser())

app.get("/app/v1/welcome", (req, res) => {
  res.render("welcome")
})

app.use("/app/v1/users", authRoutes)
app.use("/app/v1/admin", adminRoutes)
app.use("/app/v1/author", authorRoutes)
app.use("/app/v1/blogs", BlogRouter)

app.all("*", (req, res, next) => {
  let err = new CustomError(404, "Page Not Found")
  next(err)
})


////Cookie_parser
// app.get('/set-cookie', (req,res)=>{
//   res.cookie("name", "Shwetha" , {
//     maxAge : 60*1000,
//     httpOnly : true
//   })
//   res.end("Cookie Set")
// })

// app.get("/get-cookie" , (req, res) =>{
//   res.send(req.cookies.name)
// })

// app.get("delete-cookie", (req,res)=>{
//   res.clearCookie("name");
//   console.log("Cookie cleared")
//   // res.cookie("name", "", {
//   //   maxAge : 1
//   // })
//   res.end("Cookie Deleted")
// })



/////Global error handler
app.use(globalErrorController)

module.exports = app
