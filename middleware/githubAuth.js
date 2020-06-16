const passport = require("passport");
const GithubStrategy = require('passport-github').Strategy;
const dot = require("dotenv").config();

// Github login

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (id, cb) {
    cb(null, id);
});

const userID = process.env.GITHUB_CLIENT_ID;
const userSecret = process.env.GITHUB_CLIENT_SECRET;

passport.use(new GithubStrategy({
    clientID: userID,
    clientSecret: userSecret,
    callbackURL: "http://localhost:4000/login/github/callback"
},
    function (accessToken, refreshToken, profile, cb) {

        console.log(profile);
        User.findOrCreate({ githubId: profile.id }, function (err, user) {
            return cb(null, user);
        });
    }
));

module.exports = passport;