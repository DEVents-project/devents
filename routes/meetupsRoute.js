const Route = require("express").Router();
const { getMeetupsWCS, getMeetupsLW } = require("../controllers/meetupsController");

Route.get("/wcs", getMeetupsWCS);
Route.get("/lewagon", getMeetupsLW);

module.exports = Route;