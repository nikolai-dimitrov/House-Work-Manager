const jsonwebtoken = require("jsonwebtoken");
const util = require("util");

module.exports = {
    sign: util.promisify(jsonwebtoken.sign),
    verify: util.promisify(jsonwebtoken.verify),
};
