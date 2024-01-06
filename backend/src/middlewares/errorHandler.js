const errorHandler = (err, req, res, next) => {
    const errHttpCode = err.httpCode || 400;
    const errMsg = err.message || "Something went wrong";
    const isCustom = err.isCustom || false;
    res.status(errHttpCode).json({
        // success: false,
        status: errHttpCode,
        isCustomErr: isCustom,
        message: errMsg,
        // stack: process.env.NODE_ENV === "development" ? err.stack : {},
        stack: err.stack,
    });
};

module.exports = errorHandler;
