const mongoose = require("mongoose");
const { Schema } = mongoose;

const imgConventionSchema = new Schema({
    imgUrl: { type: String },
});

module.exports = mongoose.model("imgConvention", imgConventionSchema);