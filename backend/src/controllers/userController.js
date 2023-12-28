const router = require("express").Router();
const userService = require("../services/userService");

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let { user, token } = await userService.login({ email, password });
        user = { token, _id: user._id, email: user.email };
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Register
router.post("/register", async (req, res) => {
    const { email, password, repeatPassword } = req.body;
    try {
        let { newUser, token } = await userService.register({
            email,
            password,
            repeatPassword,
        });
        const user = { token, _id: newUser._id, email: newUser.email };
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Logout
router.get("/logout", (req, res) => {
    res.json({ msg: "logout" });
});

module.exports = router;
