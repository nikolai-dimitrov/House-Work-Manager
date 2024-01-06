const jwt = require("../libs/jwt");
const { JWT_SECRET } = require("../constants");
const CustomError = require("../utils/customError");
exports.authentication = async (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.split(" ")[1];
        try {
            const user = await jwt.verify(token, JWT_SECRET);
            req.user = user;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
};

exports.authRequired = (isRequired) => {
    return function (req, res, next) {
        if (isRequired === true) {
            if (!req.user) {
                return next(new CustomError(401, "You have to be logged in."));
            }
            next();
        } else {
            if (req.user) {
                return next(new CustomError(409, "You are already logged in."));
            }
            next();
        }
    };
};
