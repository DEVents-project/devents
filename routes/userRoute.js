const Route = require("express").Router()
const { getUsers, getUser, postUser, putUser, deleteUser, login } = require("../controllers/userController")
const { validateInputs } = require("../middleware/validator")
const auth = require("../middleware/authenticator")
const isAdmin = require("../middleware/rolesAuthenticator")

Route.get("/", auth, isAdmin, getUsers)
Route.get("/:id", auth, getUser)
Route.post("/", validateInputs(), postUser)
Route.post("/login", login)
Route.put("/:id", auth, putUser)
Route.delete("/:id", auth, deleteUser)


module.exports = Route