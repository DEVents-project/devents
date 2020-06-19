const mongoose = require("mongoose");
const { Schema } = mongoose;

const GitSchema = new Schema({
    id: Number,
    name: String,
    email: String,
    role: { type: String, default: "User", required: true }
})

module.exports = mongoose.model("GithubUser", GitSchema);
