const profileService = require("../services/profileService");
exports.profileRequired = async (req, res, next) => {
    const userId = req.user?._id;
    try {
        const hasProfile = await profileService.profileExists(userId);
        if (!hasProfile) {
            res.status(403).json({ message: "Please create your profile." });
            return;
        }
        next();
    } catch (error) {
        res.status(400).json({ message: error.message });
        return
    }
};
