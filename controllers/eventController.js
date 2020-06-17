const createError = require("http-errors");
const Event = require("../models/eventSchema");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose")
const User = require("../models/usersSchema")

// Mongo URI
const mongoURI = 'mongodb://127.0.0.1:27017/devents';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

//Init gfs
let gfs;

conn.once('open', () => {
    //Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
})


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

exports.getImage = async (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        res.contentType("image/png")
        const readStream = gfs.createReadStream(file.filename);
        console.log(file, "file")
        readStream.pipe(res)
    })
};

exports.postEvent = async (req, res, next) => {
    console.log(req.user._id)

    try {
        const newEvent = new Event({
            title: req.body.title,
            hostedBy: req.body.hostedBy,
            date: req.body.date,
            time: req.body.time,
            location: req.body.location,
            coordinates: req.body.coordinates,
            imgUrl: req.file.filename ? `/image/${req.file.filename}` : `/imgconvention/eventImgDefault (1).png`,
            website: req.body.website,
            description: req.body.description,
            authorId: req.user._id
        });
        await newEvent.save();
        let userData = await User.findById(req.user._id)
        console.log(userData)
        console.log('NEW Event: ', newEvent)
        userData.events.push(newEvent._id)
        userData.save()

        res.json({ success: true, event: newEvent, user: userData });
    }
    catch (err) {
        next(err);
    };
};

exports.putEvent = async (req, res, next) => {
    const { _id } = req.body;
    const event = req.body;

    try {
        console.log('EVENT ID: ', _id);
        console.log('EVENT BODY: ', event);
        const updateEvent = await Event.findByIdAndUpdate(_id, event, { new: true });
        if (!event) throw createError(404);
        console.log('UPDATE EVENT: ', updateEvent);
        res.json({ success: true, event: updateEvent });
    }
    catch (err) {
        next(err);
    };
};

exports.deleteEvent = async (req, res, next) => {
    const { _id } = req.body;

    try {
        const event = await Event.findByIdAndDelete(_id);
        console.log('EVENT DELETED: ', event);
        if (!event) throw createError(404);
        const events = await Event.find({});
        console.log('ALL EVENTS: ', events);
        res.json({ success: true, event: events });
    }
    catch (err) {
        next(err);
    };
};