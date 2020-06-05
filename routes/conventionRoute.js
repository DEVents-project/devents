const Route = require("express").Router();
const { getConventions } = require("../controllers/conventionController")

Route.get("/", getConventions)

module.exports = Route