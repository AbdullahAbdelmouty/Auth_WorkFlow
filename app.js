require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 5000||process.env.PORT

const start = async()=>{
    app.listen(PORT,console.log(`server listen to port ${PORT}`))
}

start()