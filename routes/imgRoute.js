const Route = require("express").Router();
const { getImage } = require("../controllers/eventController");


Route.get("/:filename", getImage)

module.exports = Route