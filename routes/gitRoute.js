const Router = require("express").Router();
const passport = require("passport");
const User = require("../models/usersSchema")


//auth login with Github

Router.get("/github", passport.authenticate("github",
    { scope: ["profile"] }));

Router.get("/github/redirect", passport.authenticate("github"),
    (req, res) => {
        // console.log(req.user, "user")
        // res.json({ user: req.user })
        res.redirect("http://localhost:3000/account").header("x-auth", req.user.tokens[0].token)

    })


module.exports = Router;
