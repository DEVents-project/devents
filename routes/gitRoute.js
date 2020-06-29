const passportSetup = require("../config/passportSetup")
const Router = require("express").Router();
const passport = require("passport");
const User = require("../models/usersSchema")


//auth login with Github

Router.get("/github", passport.authenticate("github",
    { scope: ["profile"] }));

Router.get("/github/redirect", passport.authenticate("github"),
    (req, res) => {
        // console.log(req.user, "user")
        console.log("hello")
        // res.json({ user: req.user })
        res.redirect(`http://localhost:4000/#/account?token=${req.user.tokens[0].token}`)

    })
Router.get("/account",
    (req, res) => {
        console.log(req)
        res.send("response")
    })



module.exports = Router;
