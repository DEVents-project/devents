const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const env = require("../config/config");

const GitSchema = new Schema({
    id: Number,
    name: String,
    email: String,
    role: { type: String, default: "User", required: true },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
})

GitSchema.methods.generateAuthToken = function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, env.jwt_key).toString();
    user.tokens.push({ token })
    return token
};

GitSchema.statics.findByToken = function (token) {
    const User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, env.jwt_key)
    } catch (err) {
        return;
    }

    return User.findOne({ _id: decoded._id }).select("-password -__v")

};

module.exports = mongoose.model("GithubUser", GitSchema);
