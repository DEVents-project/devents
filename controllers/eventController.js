const createError = require("http-errors");
const Event = require("../models/eventSchema");

exports.getEvents = async (req, res, next) => {
    try {
        const events = await Event.find();
        res.json({ success: true, events: events });
    }
    catch (err) {
        next(err);
    };
};

exports.getEvent = async (req, res, next) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);
        if (!event) throw createError(404);
        res.json({ success: true, event: event });
    }
    catch (err) {
        next(err);
    };
};

exports.postEvent = async (req, res, next) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.json({ success: true, event: event });
    }
    catch (err) {
        next(err);
    };
};

exports.putEvent = async (req, res, next) => {
    const { id } = req.params;
    const event = req.body;

    try {
        const updateEvent = await Event.findByIdAndUpdate(id, event, { new: true });
        if (!event) throw createError(404);
        res.json({ success: true, event: updateEvent });
    }
    catch (err) {
        next(err);
    };
};

exports.deleteEvent = async (req, res, next) => {
    const { id } = req.params;

    try {
        const event = await Event.findByIdAndDelete(id);
        if (!event) throw createError(404);
        res.json({ success: true, event: event });
    }
    catch (err) {
        next(err);
    };
};