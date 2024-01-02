const mongoose = require("mongoose");
const cloudinary = require("../configs/cloudinaryConfig");

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

    profileImg: {
        public_id: {
            type: "String",
            default: "profileImages/fl1nxyregc8uum3yckdz",
        },
        url: {
            type: "String",
            default:
                "https://res.cloudinary.com/drbrcolnz/image/upload/v1704198003/profileImages/fl1nxyregc8uum3yckdz.png",
        },
    },

    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
});

profileSchema.pre("findOneAndUpdate", async function () {
    const profileId = this._conditions._id;
    const currentProfile = await Profile.findOne({ _id: profileId });
    const oldImagePublicId = currentProfile.profileImg.public_id;

    if (oldImagePublicId != "profileImages/fl1nxyregc8uum3yckdz") {
        await cloudinary.uploader.destroy(oldImagePublicId);
    }
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
