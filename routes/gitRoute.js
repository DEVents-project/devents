const Router = require("express").Router();
const passport = require("passport");
const User = require("../models/gitSchema")


//auth login with Github

Router.get("/github", passport.authenticate("github",
    { scope: ["profile"] }));

Router.get("/github/redirect", passport.authenticate("github"),
    (req, res) => {
        // console.log(req.user, "user")

        res.header("x-auth", req.user.tokens[0].token)
        res.json({ user: req.user })

        // redirect("http://localhost:3000/account")
    })


module.exports = Router;
