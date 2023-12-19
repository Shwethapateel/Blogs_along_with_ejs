const CustomError = require("../utils/CustomError")

const devError = (req,res,err)=>{
    // console.log("error in dev")
    req.flash("error", err.message)
    const referingPage = req.header("Referer") || "/app/v1/welcome"
    res.redirect(referingPage)
    // res.status(err.statusCode).json({
    //     // status: err.status,
    //     message: err.message,
    //     error : err,
    //     errorStack : err.error
    // })
}

const prodError = (req,res,err)=>{
    if(err.isOperational === true){
        req.flash("error", err.message)
        const referingPage = req.header("Referer") || "/app/v1/welcome"
        res.redirect(referingPage)
        // res.locals.err;
        // res.render("error",{error :err.message})
        // res.status(err.statusCode).json({
        //     status : err.status,
        //     message : err.message
        // })
    }else{
        // res.status(err.statusCode).json({
        //     status : "Fail",
        //     message : "Something went Wrong, Please try again later"
        // })
        req.flash("error", "Something went wrong, Plesae try again later")
    }
}

const validationErrorHandler = (err) =>{
    let errArray = Object.values(err.errors)
    let msgs = errArray.map(doc => doc.message)
    let msg = msgs.join(". ")
    let error = new CustomError(400, msg)
    return error
}

const duplicateErrorHandler = (err) =>{
    let email = err.keyValue.email
    let msg = `This email ${email} is already exists`
    let error = new CustomError(400,msg)
    return error
}

const handleCasteError = (err) =>{
    let value = err.value
    let msg = `The value ${value} is not proper ID`
    let error = new CustomError(400, msg)
    return error
}

let handleTokenExpiredError = () =>{
    let error = new CustomError(400, "Your session is expired, please try login again")
    return error
}

let handleTokenError = () =>{
    let error = new CustomError(400, "Invalid Token, please login once again")
    return error
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"
    if(process.env.NODE_ENV === "development"){
        devError(req,res,err)
    }

    if (process.env.NODE_ENV === "production") {
        if(err.name === "ValidationError"){
            err = validationErrorHandler(err)
        }
        if(err.code === 11000){
            err = duplicateErrorHandler(err)
        }
        if(err.name === "CastError"){
            err = handleCasteError(err)
        }
        if(err.name === "TokenExpiredError"){
            err = handleTokenExpiredError(err)
        }
        if(err.name === "JsonWebTokenError"){
            err = handleTokenError()
        }
        prodError(req,res, err)
    }
}