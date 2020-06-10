const mongoose = require("mongoose");
const { Schema } = mongoose;

const conventionSchema = new Schema({
    title: String,
    date: String,
    location: String,
    city: String,
    description: String,
    img: String,
    url: String,
});

module.exports = mongoose.model("conventions", conventionSchema);