const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    email: {
        type: "String",
        required: [true, "Email is required!"],
        match: [
            /^[A-Za-z0-9_\.]+@[A-Za-z]+\.[A-Za-z]{2,3}$/,
            "Email is not valid!",
        ],
        unique: [true, "Email already exists!"],
    },

    password: {
        type: "String",
        required: [true, "Password is required!"],
        minLength: [4, "Password must be at least 4 characters"],
    },

    employer: {
        type: "Boolean",
        default: false,
    },

    // profile: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Profile",
    // },
});

userSchema.virtual("repeatPassword").set(function (value) {
    if (value != this.password) {
        throw new Error("Password miss match!");
    }
});

userSchema.pre("save", async function () {
    const hashPassword = await bcrypt.hash(this.password, 10);
    this.password = hashPassword;
});

const User = mongoose.model("User", userSchema);
module.exports = User;
