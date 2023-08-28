const CustomApiError = require("./custom_api_error")

class UnAuthorizedError extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode = 403
    }
}

module.exports = UnAuthorizedError