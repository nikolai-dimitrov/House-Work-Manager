const dateFormatter = require("../utils/dateFormatter");
exports.validateDate = (inputDate) => {
    let dateNow = dateFormatter.changeFormat(new Date());
    if (inputDate < dateNow) {
        console.log((inputDate = dateNow));
        return false;
    }
    return true;
};

exports.validateTime = (inputTime, inputDate) => {
    const dateNow = dateFormatter.changeFormat(new Date());
    const date = new Date();
    let [startHour, finishHour] = inputTime.split(" - ");
    if (startHour >= finishHour) {
        throw new Error("Finish hour must be greater than start hour.");
    }
    if (inputDate == dateNow) {
        const currentTime = `${date.getHours()}:${date.getMinutes()}`;
        if (startHour <= currentTime) {
            throw new Error(
                "Start hour must be greater than current time today."
            );
        }
    }
};
