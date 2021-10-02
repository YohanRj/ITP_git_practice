const ErrorHandler = require('../utils/errorHandler' );



module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500 ;
    
    if(process.env.NODE_ENV == 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success : false,
            error:err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    if(process.env.NODE_ENV == 'PRODUCTION'){
        let error = {...err}

        error.message = err.message

        //mn methnta dala blnwa methna idn ptn gnnwa 13 weni ekt adlawa aluthin add krna kella

        // MngoDB wala duplicate key error
        if(err.code === 11000){
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`
            error = new ErrorHandler(message, 400)
        }

        //weradi JWT error ekkd
        if(err.name === 'JsonWebTokenError'){
            const message = 'JSON web Token is invalid. Try Again!!!'
            error = new ErrorHandler(message, 400)
        }

        //expired JWT error
        if(err.name === 'TokenExpiredError'){
            const message = 'JSON web Token is expired. Try Again!!!'
            error = new ErrorHandler(message, 400)
        }


        //methnin iwry mn aluthin dapu tika 13 weni ekt adlwa

        //anukgen start
        if (err.name === 'CastError'){
            const message = `Resourse not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400)
        }

        // Handling Mongoose Validation Error
        if(err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400)
        }


        //anukagen end


        res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })



    }

 
}