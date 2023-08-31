const mongoose = require('mongoose')

const conntectDB = (url)=>{
    return mongoose.connect(url)
}

module.exports = conntectDB