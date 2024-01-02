const Profile = require("../models/Profile");

exports.getDetails = async (userId) => {
    const currentProfile = await Profile.findOne({ owner: userId });
    if (!currentProfile) {
        throw new Error("You haven't created a profile yet.");
    }

    return currentProfile;
};
exports.profileExists = async (userId) => {
    return await Profile.exists({ owner: userId})
};
exports.create = async (profileData) => {
    let existingProfile = await Profile.findOne({ owner: profileData.owner });
    if (existingProfile) {
        throw new Error("You already have a profile.");
    }

    const profile = await Profile.create(profileData);
    return profile;
};

exports.update = async (profileData, userId) => {
    let currentProfile = await Profile.findOne({ owner: userId });
    if (!currentProfile) {
        throw new Error("You haven't created a profile yet.");
    }

    const profileId = currentProfile._id;
    return Profile.findByIdAndUpdate(profileId, profileData, {
        runValidators: true,
        new: true,
    });
};
