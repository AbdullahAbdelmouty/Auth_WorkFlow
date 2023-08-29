require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const conntectDB = require('./DB/connect')
const cookiesParser = require('cookie-parser')
// routes
const authRouter = require('./Routes/auth')
// middleware
const errorHandlerMiddleware = require('./Middlewares/error_handler_middleware')
const notFoundMiddleware = require('./Middlewares/not_found_middleware')
app.use(express.json())
app.use(cookiesParser(process.env.JWT_SECERT))

app.use('/api/v1/auth', authRouter);

// app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = 5000||process.env.PORT

const start = async()=>{
    try {
        await conntectDB(process.env.MONGO_URL)
        app.listen(PORT,console.log(`server listen to port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

start()