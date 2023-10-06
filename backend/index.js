require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const conntectDB = require('./DB/connect')
const cookiesParser = require('cookie-parser')
// import proxy middleware
const {createProxyMiddleware} = require('http-proxy-middleware')
// const proxyMiddleware = require("./Middlewares/proxyMiddleware")
// routes
const authRouter = require('./Routes/auth')
const userRouter = require('./Routes/user')
// middleware
const errorHandlerMiddleware = require('./Middlewares/error_handler_middleware')
const notFoundMiddleware = require('./Middlewares/not_found_middleware')
const morgan = require('morgan');
app.set('trust proxy', 1);

app.use(express.json())
app.use(cookiesParser(process.env.JWT_SECERT))
app.use(morgan('dev'))
// create proxy middleware options
// const options = {
//     target:"https://auth-work-flow-sa3n.vercel.app",
//     changeOrigin: true,
// }
// create the proxy (without context)
// const proxy = createProxyMiddleware(options);
// mount `exampleProxy` in web server

app.get('/test',(req,res)=>{
    res.send('auth api')
}
)

// const proxyMiddleware = createProxyMiddleware(options)
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000

const start = async()=>{
    try {
        await conntectDB(process.env.MONGO_URL)
        app.listen(PORT,console.log(`server listen to port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

start()