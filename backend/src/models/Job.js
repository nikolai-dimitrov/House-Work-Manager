const jobsModelValidators = require("../validators/jobsModelValidators");
const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
    {
        title: {
            type: "String",
            required: [true, "Title is required!"],
            minLength: [4, "Title must be at least 4 characters!"],
        },

        description: {
            type: "String",
            required: [true, "Description is required!"],
            minLength: [10, "Description must be at least 10 characters!"],
        },

        image: {
            public_id: {
                type: "String",
                required: true,
            },
            url: {
                type: "String",
                required: true,
            },
        },

        date: {
            type: "string",
            required: [true, "Job Date is required!"],
            minLength: [8, "Description must be at least 8 characters!"],
            match: [
                /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
                "Date format is yyyy-mm-dd",
            ],
            validate: [
                {
                    validator: jobsModelValidators.validateDate,
                    message: "Date can't be before today.",
                },
            ],
        },

        timeRange: {
            type: "String",
            required: [true, "Time Range is required!"],
            minLength: [3, "Title must be at least 3 characters!"],
            match: [
                /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]+ - ([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                "Clock format is HH:MM - HH:MM (13:00 - 14:00)",
            ],
        },

        city: {
            type: "String",
            required: [true, "City is required!"],
            minLength: [4, "City must be at least 4 characters!"],
        },

        street: {
            type: "String",
            required: [true, "Street is required!"],
            minLength: [4, "Street must be at least 4 characters!"],
        },

        streetNumber: {
            type: "Number",
            required: [true, "Street Number is required!"],
            min: [0, "Street Number must be positive number!"],
        },

        status: {
            type: "String",
            enum: ["Published", "InProcess", "Completed"],
            default: "Published",
        },

        pricePerHour: {
            type: "Number",
            required: [true, "Profit  is required."],
            min: [1, "Profit should be positive number."],
        },

        taskExecutor: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            default: null,
        },

        owner: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    },

    { timestamps: true }
);

jobSchema.pre("validate", function () {
    jobsModelValidators.validateTime(this.timeRange, this.date);
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
