const Job = require("../models/Job");
const mongoose = require("mongoose");
const CustomError = require("../utils/customError");
exports.getAll = () => {
    return Job.find({ status: "Published" });
};

exports.getOne = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomError(404, "No such job");
    }
    let currentJob = await Job.findById(id);
    if (!currentJob) {
        throw new CustomError(404, "No such job");
    }
    return currentJob;
};

exports.create = (data) => {
    return Job.create(data);
};

exports.update = (id, newData) => {
    return Job.findByIdAndUpdate(id, newData, {
        runValidators: true,
        new: true,
    });
};

exports.remove = (id) => {
    return Job.findByIdAndDelete(id);
};

exports.applyJob = (executorId, job) => {
    if (!mongoose.Types.ObjectId.isValid(executorId)) {
        throw new CustomError(404, "No such user.");
    }

    if (job.taskExecutor == executorId) {
        throw new CustomError(400, "You have already taken this job.");
    }

    if (job.taskExecutor != null) {
        //&& job.taskExecutor != executorId
        throw new CustomError(400, "This job has already taken.");
    }
    const jobId = job._id;
    return Job.findByIdAndUpdate(
        jobId,
        { $set: { taskExecutor: executorId, status: "InProcess" } },
        {
            runValidators: false,
            new: true,
        }
    );
};
exports.cancelJob = (userId, job) => {
    if (job.taskExecutor == null) {
        throw new CustomError(400, "You aren't the job executor.");
    }

    if (job.taskExecutor != userId) {
        throw new CustomError(400, "You aren't the job executor.");
    }

    const jobId = job._id;
    return Job.findByIdAndUpdate(
        jobId,
        { $set: { taskExecutor: null, status: "Published" } },
        {
            runValidators: false,
            new: true,
        }
    );
};
