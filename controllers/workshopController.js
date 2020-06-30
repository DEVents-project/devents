const Workshop = require("../models/workshopSchema");


exports.getWorkshops = async (req, res, next) => {
    try {
        const workshops = await Workshop.find();
        res.json({ success: true, events: workshops });
    } catch (err) {
        next(err);
    }
};