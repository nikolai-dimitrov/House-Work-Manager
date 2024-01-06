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
