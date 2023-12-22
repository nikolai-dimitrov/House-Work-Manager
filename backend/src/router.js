const router = require("express").Router();
const userController = require("./controllers/userController");
const jobController = require("./controllers/jobController");
router.use("/api/users", userController);
router.use("/api/jobs", jobController);

module.exports = router;
