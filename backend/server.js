const app = require('./app');
const connectDatabase = require('./config/database')

const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to uncaught exception');
    process.exit(1)
})

dotenv.config({ path: 'backend/config/config.env' })

connectDatabase();

const server  = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

//Handling promise rejections to prevent errors
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`); //display error message
    
    //explain why the server is shutting down
    console.log('Shutting down server due to unhandled promise rejection'); 
    
    server.close(() => {
        process.exit(1)
    })
})