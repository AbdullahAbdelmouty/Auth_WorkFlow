const CustomApiError = require("./custom_api_error")


class UnAuthenticatedError extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode = 401
    }
}

module.exports = UnAuthenticatedError