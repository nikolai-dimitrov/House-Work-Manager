const profileService = require("../services/profileService");
exports.profileRequired = async (req, res, next) => {
    const userId = req.user?._id;
    const hasProfile = await profileService.profileExists(userId);
    if (!hasProfile) {
        res.status(403).json({ message: "Profile is required" });
        return;
    }
    next();
};
