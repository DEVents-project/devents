const Route = require("express").Router();
const { getUsers, getUser, getGithub, getGithubCallback, postUser, putUser, deleteUser, login } = require("../controllers/userController");
const { validateUser } = require("../middleware/validatorUser");
const auth = require("../middleware/authenticator");
const isAdmin = require("../middleware/rolesAuthenticator");


// Route.get("/admin", auth, isAdmin, getUsers);
Route.get("/", auth, getUser);
Route.post("/", validateUser(), postUser);
Route.post("/login", login);
Route.put("/", auth, putUser);
Route.delete("/:id", auth, deleteUser);

//github login
Route.get("/login/github", getGithub);
Route.get("/login/github/callback", getGithubCallback);

module.exports = Route;