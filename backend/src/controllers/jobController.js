const router = require("express").Router();
const jobService = require("../services/jobService");
const cloudinary = require("../configs/cloudinaryConfig");
const mongoose = require("mongoose");
const { sanitizeData } = require("../middlewares/sanitizer");
const { authRequired } = require("../middlewares/authMiddleware");
const { profileRequired } = require("../middlewares/profileMiddleware");
const CustomError = require("../utils/customError");

// Retrieve all Jobs
router.get("/", async (req, res, next) => {
    try {
        const jobs = await jobService.getAll();
        res.status(200).json(jobs);
    } catch (error) {
        next(error);
    }
});

// Details Job
router.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const currentJob = await jobService.getOne(id);

        res.status(200).json(currentJob);
    } catch (error) {
        next(error);
    }
});

//Create Job
router.post(
    "/",
    sanitizeData(),
    authRequired(true),
    profileRequired,
    async (req, res, next) => {
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
            next(error);
        }
    }
);

//Delete Job
router.delete(
    "/:id",
    authRequired(true),
    profileRequired,
    async (req, res, next) => {
        try {
            const id = req.params.id;
            const userId = req.user?._id;
            const currentJob = await jobService.getOne(id);

            if (currentJob.owner._id != userId) {
                throw new CustomError(401, "You are not an owner.");
            }

            const job = await jobService.remove(id);

            await cloudinary.uploader.destroy(job.image.public_id);
            res.status(200).json(job);
        } catch (error) {
            next(error);
        }
    }
);

router.patch(
    "/:id",
    authRequired(true),
    profileRequired,
    async (req, res, next) => {
        const id = req.params.id;
        const userId = req.user?._id;
        const isEmployer = req.user?.employer;
        try {
            let currentJob = await jobService.getOne(id);
            const executorId = req.body.taskExecutor;
            if (executorId == null) {
                const updatedJob = await jobService.cancelJob(
                    userId,
                    currentJob,
                    isEmployer
                );
                res.status(200).json(updatedJob);
            } else {
                const updatedJob = await jobService.applyJob(
                    executorId,
                    currentJob,
                    isEmployer
                );
                res.status(200).json(updatedJob);
            }
            // const currentJob = await jobService.getOne(id);
        } catch (error) {
            next(error);
        }
    }
);

// Edit Job
router.put(
    "/:id",
    sanitizeData(),
    authRequired(true),
    profileRequired,
    async (req, res, next) => {
        try {
            const id = req.params.id;
            const userId = req.user?._id;
            const data = { ...req.body };

            const currentJob = await jobService.getOne(id);

            if (currentJob.owner._id != userId) {
                throw new CustomError(401, "You are not an owner.");
            }

            await cloudinary.uploader.destroy(currentJob.image.public_id);
            const newImage = await cloudinary.uploader.upload(data.image, {
                folder: "houseImages",
            });

            data.image = {
                public_id: newImage.public_id,
                url: newImage.secure_url,
            };

            const job = await jobService.update(id, data);
            res.status(200).json(job);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
