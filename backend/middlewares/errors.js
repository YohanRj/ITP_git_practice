const ErrorHandler = require('../utils/errorHandler');

//when the status code does not exist, code for the internal server error will be shown
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    // err.message = err.message || 'Internal Server Error';
    
    if(process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }
    
    if(process.env.NODE_ENV === 'PRODUCTION') {
        //creating a copy of err
        let error = {...err}
        error.message = err.message;

        //handling Mongoose object ID errors such as "CastError"
        if(err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400)
        }

        //handling Mongoose validation errors (will handle multiple errors)
        if(err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400)
        }


        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }

}