const jwt = require("../libs/jwt");
const { JWT_SECRET } = require("../constants");
exports.authentication = async (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.split(" ")[1];
        try {
            const user = await jwt.verify(token, JWT_SECRET);
            req.user = user;
            next();
        } catch (error) {
            res.status(401).json({ message: "Invalid access token." });
            return;
        }
    } else {
        next();
    }
};

exports.authRequired = (isRequired) => {
    return function (req, res, next) {
        if (isRequired === true) {
            if (!req.user) {
                res.status(401).json({ message: "Login required." });
                return;
            }
            next();
        } else {
            if (req.user) {
                res.status(409).json({ message: "You are already logged in." });
                return;
            }
            next();
        }
    };
};
