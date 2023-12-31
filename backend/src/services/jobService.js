const Job = require("../models/Job");

exports.getAll = () => {
    return Job.find({});
};

exports.getOne = (id) => {
    return Job.findById(id);
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
