const router = require("express").Router();
router.get("/register", (req, res) => {
    res.json({ msg: "register path" });
});
module.exports = router;
