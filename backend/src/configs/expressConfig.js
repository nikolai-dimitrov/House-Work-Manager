const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("../router");
const { authentication } = require("../middlewares/authMiddleware");
const setupExpress = (app) => {
    // app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cookieParser());
    // Auth middleware
    app.use(authentication);
    app.use(router);
};

module.exports = setupExpress;
