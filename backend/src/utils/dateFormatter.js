exports.changeFormat = (date) => {
    // 20/12/2023
    let formattedDate = date
        .toJSON()
        .split("T")[0]
        .split("-")
        .reverse()
        .join("/");
    return formattedDate;
};
