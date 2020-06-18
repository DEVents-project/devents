const passport = require("passport");
const GithubStrategy = require('passport-github2').Strategy;
const dot = require("dotenv").config();

// Github login
passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (id, cb) {
    cb(null, id);
});

const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

passport.use(new GithubStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: "http://localhost:4000/auth/github/redirect"
},
    function (accessToken, refreshToken, profile, cb) {

        console.log(profile);
        User.findOrCreate({ githubId: profile.id }, function (err, user) {
            return cb(null, user);
        });
    }
));

module.exports = passport;