const { body, validationResult } = require("express-validator");

const sanitizeData = () => {
    return [
        body("title").trim(),
        body("description").trim(),
        body("date").trim(),
        body("timeRange").trim(),
        body("city").trim(),
        body("street").trim(),
    ];
};
module.exports = {
    sanitizeData,
};
