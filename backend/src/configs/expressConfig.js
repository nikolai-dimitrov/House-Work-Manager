const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("../router");
const { authentication } = require("../middlewares/authMiddleware");
const errorHandler = require("../middlewares/errorHandler");
const setupExpress = (app) => {
    // app.use(express.urlencoded({ extended: false }));
    app.use(express.json({ limit: "100mb" }));
    app.use(cookieParser());
    // Auth middleware
    app.use(authentication);
    app.use(router);
    app.use(errorHandler);
};

module.exports = setupExpress;
