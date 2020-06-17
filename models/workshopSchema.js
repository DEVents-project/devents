const mongoose = require("mongoose");
const { Schema } = mongoose;

const workshopSchema = new Schema({
    title: String,
    date: String,
    time: String,
    location: String,
    city: String,
    description: String,
    img: String,
    url: String,
});

module.exports = mongoose.model("workshops", workshopSchema);