const errorHandler = (err, req, res, next) => {
    console.log("error getted");
    const errHttpCode = err.httpCode || 400;
    const errMsg = err.message || "Something went wrong";
    res.status(errHttpCode).json({
        // success: false,
        // status: errStatus,
        message: errMsg,
        // stack: process.env.NODE_ENV === "development" ? err.stack : {},
        stack: err.stack,
    });
};

module.exports = errorHandler;
