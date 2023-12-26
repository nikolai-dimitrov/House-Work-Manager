const router = require("express").Router();
const jobService = require("../services/jobService");
const mongoose = require("mongoose");
const cloudinary = require("../configs/cloudinaryConfig");

router.get("/", async (req, res) => {
    try {
        const jobs = await jobService.getAll();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "No such job" });
        }
        const currentJob = await jobService.getOne(id);
        if (!currentJob) {
            return res.status(404).json({ error: "No such job" });
        }
        res.status(200).json(currentJob);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    const data = { ...req.body, owner: req.user?._id };
    try {
        const result = await cloudinary.uploader.upload(data.image, {
            folder: "houseImages",
        });

        data.image = {
            public_id: result.public_id,
            url: result.secure_url,
        };
        const job = await jobService.create(data);

        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "No such job" });
        }
        const job = await jobService.remove(id);
        if (!job) {
            return res.status(404).json({ error: "No such job" });
        }
        await cloudinary.uploader.destroy(job.image.public_id);
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "No such job" });
        }
        const data = { ...req.body };
        const job = await jobService.update(id, data);
        if (!job) {
            return res.status(404).json({ error: "No such job" });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
