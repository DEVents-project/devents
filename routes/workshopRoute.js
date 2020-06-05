const Route = require("express").Router();
const { getWorkshops } = require("../controllers/workshopController")

Route.get("/", getWorkshops)

module.exports = Route