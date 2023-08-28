require('dotenv').config()
const express = require('express')
const app = express()
const conntectDB = require('./DB/connect')
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