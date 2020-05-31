const Route = require("express").Router()
const { getUsers, getUser, postUser, putUser, deleteUser, login } = require("../controllers/userController")
const auth = require("../middleware/authenticator")
const { validateInputs } = require("../middleware/validator")
const isAdmin = require("../middleware/rolesAuthenticator")

Route.get("/", auth, isAdmin, getUsers)
Route.get("/:id", auth, getUser)
Route.post("/", validateInputs(), postUser)
Route.post("/login", login)

Route.put("/:id", auth, putUser)

Route.delete("/:id", auth, deleteUser)




module.exports = Route