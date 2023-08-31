const CustomApiError = require("./custom_api_error");

class BadRequestError extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode = 400
    }
}

module.exports = BadRequestError