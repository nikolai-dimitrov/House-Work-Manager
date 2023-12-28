const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
    firstName: {
        type: "string",
        required: [true, "First Name is required."],
        minLength: [3, "First Name must be at least 3 characters!"],
        default: "",
    },

    lastName: {
        type: "string",
        required: [true, "Last Name is required."],
        minLength: [3, "Last Name must be at least 4 characters!"],
        default: "",
    },

    phoneNumber: {
        type: "string",
        required: [true, "Phone Number is required."],
        match: [/^0[1-9]{1}[0-9]{8}$/, "Phone Number is not valid!"],
    },

    //Add default profile picture
    profileImg: {
        public_id: {
            type: "String",
            required: true,
        },
        url: {
            type: "String",
            required: true,
        },
    },

    isActivated: {
        type: "boolean",
        default: false,
    },
});
const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
