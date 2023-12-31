const Profile = require("../models/Profile");
const CustomError = require("../utils/customError");
exports.getDetails = async (userId) => {
    const currentProfile = await Profile.findOne({ owner: userId });
    if (!currentProfile) {
        throw new CustomError(404, "You haven't created a profile yet.");
    }

    return currentProfile;
};

exports.create = async (profileData) => {
    let existingProfile = await Profile.findOne({ owner: profileData.owner });
    if (existingProfile) {
        throw new CustomError(422, "You already have a profile.");
    }

    const profile = await Profile.create(profileData);
    return profile;
};

exports.update = async (profileData, userId) => {
    let currentProfile = await Profile.findOne({ owner: userId });
    if (!currentProfile) {
        throw new CustomError(404, "You haven't created a profile yet.");
    }

    const profileId = currentProfile._id;
    return Profile.findByIdAndUpdate(profileId, profileData, {
        runValidators: true,
        new: true,
    });
};

exports.profileExists = async (userId) => {
    return await Profile.exists({ owner: userId });
};
