const profileService = require("../services/profileService");
exports.profileRequired = async (req, res, next) => {
    const userId = req.user?._id;
    const hasProfile = await profileService.profileExists(userId);
    if (!hasProfile) {
        console.log("no profile");
        res.status(403).json({ error: "Profile is required" });
        return;
    }
    next();
};
