const User = require("../models/User");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("../libs/jwt");
const { JWT_SECRET } = require("../constants");
const CustomError = require("../utils/customError");
// const { buildPayloadJwt } = require("../utils/authUtil");

exports.login = async (userData) => {
    if (!userData.email || !userData.password) {
        throw new CustomError(400, "All fields are required.");
    }

    const user = await User.findOne({ email: userData.email });
    if (!user) {
        throw new CustomError(401, "Invalid email or password");
    }

    const passwordValid = await bcrypt.compare(
        userData.password,
        user.password
    );

    if (!passwordValid) {
        throw new CustomError(401, "Invalid email or password");
    }

    // const payload = buildPayloadJwt(user);
    const token = await jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "2d",
    });

    return { user, token };
};

exports.register = async (userData) => {
    if (!userData.email || !userData.password || !userData.repeatPassword) {
        throw new CustomError(400, "All fields are required.");
    }

    if (!validator.isEmail(userData.email)) {
        throw new CustomError(400, "Email is not valid.");
    }

    if (!validator.isStrongPassword(userData.password)) {
        throw new CustomError(400, "This password isn't strong enough.");
        // Password must contain 1 Uppercase character and 1 symbol and 1 digit
    }

    const existingUser = await User.findOne({ email: userData.email });
    // if (existingUser) {
    //     throw new CustomError(409, "Email already exists.");
    // }

    let newUser = await User.create(userData);

    // const payload = buildPayloadJwt(newUser);
    const token = await jwt.sign({ _id: newUser._id }, JWT_SECRET, {
        expiresIn: "2d",
    });

    return { newUser, token };
};
