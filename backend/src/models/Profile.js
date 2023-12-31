const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
    firstName: {
        type: "string",
        required: [true, "First Name is required."],
        minLength: [3, "First Name must be at least 3 characters!"],
    },

    lastName: {
        type: "string",
        required: [true, "Last Name is required."],
        minLength: [3, "Last Name must be at least 4 characters!"],
    },

    phoneNumber: {
        type: "string",
        required: [true, "Phone Number is required."],
        match: [/^0[1-9]{1}[0-9]{8}$/, "Phone Number is not valid!"],
    },
    // TODO: Folder with profile pictures in cloudinary and change houseImages/ -> profileImages
    profileImg: {
        public_id: {
            type: "String",
            default: "houseImages/ui4jtdbcgjyhyv3ybdbg",
        },
        url: {
            type: "String",
            default:
                "https://res.cloudinary.com/drbrcolnz/image/upload/v1704027745/houseImages/ui4jtdbcgjyhyv3ybdbg.png",
        },
    },

    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
});
const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
