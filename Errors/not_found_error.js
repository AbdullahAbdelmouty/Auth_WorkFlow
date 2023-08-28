const CustomApiError = require("./custom_api_error");

class NotFoundError extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode = 404
    }
}

module.exports = CustomApiError;