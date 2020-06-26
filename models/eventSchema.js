const mongoose = require("mongoose");
const { Schema } = mongoose;


const EventSchema = new Schema({
    title: { type: String, required: true },

    hostedBy: { type: String, required: false },

    authorId: { type: String, required: false },

    date: { type: String, required: true },

    time: { type: String, required: true },

    location: { type: String, required: false, default: 'Online event' },

    coordinates: { type: String, required: false },

    lat: { type: Number, required: false },

    lng: { type: Number, required: false },

    imgUrl: { type: String, required: true },

    website: { type: String },

    description: { type: String, required: true },

    createdAt: { type: Date, default: Date.now }


});

module.exports = mongoose.model("Event", EventSchema);