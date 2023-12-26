const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("../router");
const setupExpress = (app) => {
    // app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cookieParser());
    // Auth middleware here.
    app.use(router);
};

module.exports = setupExpress;
