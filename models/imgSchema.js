const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const FileImage = new Schema({
    file: Object
})

module.exports = mongoose.model("Image", FileImage)