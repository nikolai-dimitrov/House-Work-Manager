const profileService = require("../services/profileService");
const CustomError = require("../utils/customError");

exports.profileRequired = async (req, res, next) => {
    const userId = req.user?._id;
    try {
        const hasProfile = await profileService.profileExists(userId);
        if (!hasProfile) {
            throw new CustomError(403, "Please create your profile");
        }
        next();
    } catch (error) {
        next(error);
    }
};
