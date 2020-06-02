const bcrypt = require("bcrypt");

exports.encrypt = async (password) => {
    if (!password) return "Please provide your password."

    return await bcrypt.hash(password, 10);
};

exports.compare = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};