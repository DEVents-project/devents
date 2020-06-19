const Router = require("express").Router();
const passport = require("passport");

//auth login with Github

Router.get("/github", passport.authenticate("github",
    { scope: ["profile"] }));

Router.get("/github/redirect", passport.authenticate("github"),
    (req, res) => {
        res.redirect("/events")
    })


module.exports = Router;
