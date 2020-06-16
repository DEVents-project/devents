const mongoose = require("mongoose");
const { Schema } = mongoose;

const imgWorkshopSchema = new Schema({
    imgUrl: { type: String },
});

module.exports = mongoose.model("imgWorkshop", imgWorkshopSchema);