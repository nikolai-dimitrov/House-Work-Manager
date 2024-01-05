const router = require("express").Router();
const userService = require("../services/userService");
const { authRequired } = require("../middlewares/authMiddleware");

// Login
router.post("/login", authRequired(false), async (req, res, next) => {
    const { email, password } = req.body;
    try {
        let { user, token } = await userService.login({ email, password });
        user = { token, _id: user._id, email: user.email };
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

// Register
router.post("/register", authRequired(false), async (req, res, next) => {
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
        next(error);
    }
});

// Logout
//TODO:Logout 
router.get("/logout", (req, res) => {
    res.json({ message: "logout" });
});

module.exports = router;
