const router = require("express").Router();
const userController = require("./controllers/userController");
router.use("/users", userController);
// router.get("*", (req, res) => {
//     res.json({msg:'Not found'})
//   });
module.exports = router;