const router = require("express").Router();

router.get("/", (req, res) => {
    res.json({ msg: "retrieved all" });
});

router.post("/", (req, res) => {
    res.json({ msg: "created" });
});

router.delete("/:id", (req, res) => {
    res.json({ msg: "deleted" });
});

router.put("/:id", (req, res) => {
    res.json({ msg: "updated" });
});

module.exports = router;
