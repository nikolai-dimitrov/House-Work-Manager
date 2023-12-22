const mongoose = require("mongoose");
const { DB_HOST, DB_NAME } = require("../constants");
const setupMongoose = async (app) => {
    try {
        const mongooseUrl = `${DB_HOST}/${DB_NAME}`;
        await mongoose.connect(mongooseUrl);
        console.log(`Connected to ${mongooseUrl}`);
    } catch (error) {
        console.log(`Failed to connect to ${mongooseUrl}`, error);
    }
};

module.exports = setupMongoose;
