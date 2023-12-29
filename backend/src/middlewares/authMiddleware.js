const jwt = require("../libs/jwt");
const { JWT_SECRET } = require("../constants");
exports.authentication = async (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.split(" ")[1];
        try {
            const userId = await jwt.verify(token, JWT_SECRET);
            req.userId = userId;
            next()
        } catch (error) {
            res.status(401).json({ error: "Invalid access token." });
        }
    } else {
        next();
    }
};

exports.authRequired = (isRequired) => {
    return function (req, res, next) {
        if (isRequired === true) {
            if (!req.userId) {
                res.status(401).json({ error: "Login required." });
                return;
            }
            next();
        } else {
            if (req.userId) {
                res.status(403).json({ error: "You are already logged in." });
                return;
            }
            next();
        }
    };
};
