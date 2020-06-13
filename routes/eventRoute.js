const Route = require("express").Router();
const { getEvent, getEvents, postEvent, putEvent, deleteEvent, getImage } = require("../controllers/eventController");
const upload = require("../middleware/gridFsStorage");
const auth = require("../middleware/authenticator")

Route.get("/", getEvents);
Route.get("/:id", getEvent);
Route.post("/", auth, upload.single("file"), postEvent);
Route.put("/", putEvent);
Route.delete("/:id", deleteEvent);

module.exports = Route;