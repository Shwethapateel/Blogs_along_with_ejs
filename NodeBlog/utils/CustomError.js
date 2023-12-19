class CustomError extends Error{
    constructor(statusCode, message){
        super(message)
        this.statusCode = statusCode
        this.status = statusCode >= 400 && statusCode <= 500 ? "Fail" : "error"
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)  /////this => pointing to Error & this.contrictor => pointing to CustomError
    }
}
module.exports = CustomError