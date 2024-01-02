const router = require("express").Router();
const userController = require("./controllers/userController");
const jobController = require("./controllers/jobController");
const profileController = require("./controllers/profileController");

router.use("/api/users", userController);
router.use("/api/jobs", jobController);
router.use("/api/profile", profileController);

module.exports = router;
