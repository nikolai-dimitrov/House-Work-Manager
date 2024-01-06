class CustomError extends Error {
    httpCode;
    message;

    constructor(httpCode, message) {
        super(message);
        this.httpCode = httpCode;
        this.message = message;
        this.isCustom = true;
    }
}
module.exports = CustomError;
