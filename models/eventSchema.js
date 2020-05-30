const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
    name: { type: String, required: true },

    hostedBy: { type: String, required: true },

    createdAt: { type: Date, default: Date.now },

    city: { type: String, required: true },

    address: { type: String, required: true },

    day: { type: Number, required: true },

    month: { type: Number, required: true },

    year: { type: Number, required: true },

    description: { type: String, required: true }
});

module.exports = mongoose.model("Event", EventSchema);