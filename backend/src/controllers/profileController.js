const router = require("express").Router();
const { authRequired } = require("../middlewares/authMiddleware");
const profileService = require("../services/profileService");
// Get user's profile details
router.get("/details", authRequired(true), async (req, res) => {
    try {
        const userId = req.user?._id;
        const profile = await profileService.getDetails(userId);
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Create user's profile
router.post("/create", authRequired(true), async (req, res) => {
    try {
        const profileData = { ...req.body, owner: req.user?._id };
        const profile = await profileService.create(profileData);
        res.status(201).json({ profile });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Edit user's profile
router.put("/edit", authRequired(true), async (req, res) => {
    try {
        const userId = req.user?._id;
        const profileData = { ...req.body };
        const profile = await profileService.update(profileData, userId);
        res.status(201).json({ profile });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 4. Create profile after user register and log in -> redirect to profile section
// 5. If not profile created cannot post edit delete jobs only view (like unauthenticated user)
module.exports = router;
