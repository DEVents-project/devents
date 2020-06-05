const mongoose = require("mongoose");
const { Schema } = mongoose;

const workshopSchema = new Schema({
    title: String,
    date: String,
    location: { type: String, required: false },
    city: String,
    description: String,
    img: String,
    url: String,
})

module.exports = mongoose.model("workshops", workshopSchema)