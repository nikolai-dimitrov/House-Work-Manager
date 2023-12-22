const express = require("express");
const { PORT } = require("./constants");
const expressConfig = require("./configs/expressConfig")
const mongooseConfig = require("./configs/mongooseConfig");
let app = express();
const startApp = async (app) => {
    try {
        expressConfig(app)
        mongooseConfig();
        app.listen(PORT, () =>
            console.log(`Server is running at PORT: ${PORT}`)
        );
    } catch (error) {
        console.log(error)
    }
};
startApp(app);
