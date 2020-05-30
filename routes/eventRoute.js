const Route = require("express").Router();
const { getEvent, getEvents, postEvent, putEvent, deleteEvent } = require("../controllers/eventController");

Route.get("/", getEvents);
Route.get("/:id", getEvent);
Route.post("/", postEvent);
Route.put("/:id", putEvent);
Route.delete("/:id", deleteEvent);

module.exports = Route;