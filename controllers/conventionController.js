const Convention = require("../models/conventionSchema");

exports.getConventions = async (req, res, next) => {
    try {
        const conventions = await Convention.find()
        res.json({ success: true, events: conventions })
    } catch (err) {
        next(err);
    }
};