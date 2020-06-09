const Route = require("express").Router();
const { getEvent, getEvents, postEvent, putEvent, deleteEvent, getImage } = require("../controllers/eventController");
const upload = require("../middleware/gridFsStorage");

Route.get("/", getEvents);
Route.get("/:id", getEvent);
Route.post("/", upload.single("file"), postEvent);
Route.put("/:id", putEvent);
Route.delete("/:id", deleteEvent);

module.exports = Route;