exports.changeFormat = (date) => {
    //2023-12-31
    let formattedDate = date.toJSON().split("T")[0];
    return formattedDate;
};
