const CustomError = require("../utils/customError");

const validationErrorHandler = (err) => {
    let errors = Object.values(err.errors).map((value) => value.message);
    const errorMsg = errors.join(". ");
    return new CustomError(400, errorMsg);
};

const developmentErrors = (err, res) => {
    res.status(err.httpCode).json({
        status: err.httpCode,
        message: err.message,
        stack: err.stack,
        error: err,
    });
};

const productionErrors = (err, res) => {
    if (err.showProd) {
        res.status(err.httpCode).json({
            status: err.httpCode,
            message: err.message,
        });
    } else {
        res.status(500).json({
            status: 500,
            message: "Something went wrong! Try again later.",
        });
    }
};

const errorHandler = (err, req, res, next) => {
    err.httpCode = err.httpCode || 500;
    console.log(err.name)
    if (process.env.NODE_ENV === "dev") {
        console.log(err);
        developmentErrors(err, res);
    } else if (process.env.NODE_ENV === "prod") {
        if (err.name == "ValidationError") {
            err = validationErrorHandler(err);
        }
        productionErrors(err, res);
    }
};

module.exports = errorHandler;
