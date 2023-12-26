const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "drbrcolnz",
    api_key: "694955288515316",
    api_secret: "xQIjkS637byKBSITRxmBJOd1YEU",
});
module.exports = cloudinary;
