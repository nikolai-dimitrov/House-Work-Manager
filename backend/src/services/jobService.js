const Job = require("../models/Job");
const mongoose = require("mongoose");
const CustomError = require("../utils/customError");
exports.getAll = async (skip, limit, search, id, status) => {
    let count = await Job.countDocuments({ status: "Published" });
    const query = {};

    if (search == "owner") {
        query["owner"] = id;
        count = await Job.countDocuments({ owner: id });
    } else if (search == "taskExecutor") {
        query["taskExecutor"] = id;
        count = await Job.countDocuments({ taskExecutor: id });
    }

    let jobs = await Job.find(status ? { status } : {})
        .skip(skip)
        .limit(limit)
        .where(query);
    return { jobs, count };
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

exports.applyJob = (executorId, job, isEmployer) => {
    if (isEmployer == true) {
        throw new CustomError(400, "You haven't registered as employee.");
    }

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

exports.cancelJob = (userId, job, isEmployer) => {
    if (isEmployer == true) {
        throw new CustomError(400, "You haven't registered as employee.");
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
