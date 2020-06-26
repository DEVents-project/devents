
const passport = require("passport");
const GithubStrategy = require('passport-github').Strategy;
const keys = require("./keys");
const User = require("../models/usersSchema");


passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    });
})

passport.use(
    new GithubStrategy({
        clientID: keys.github.clientID,
        clientSecret: keys.github.clientSecret,
        callbackURL: "http://localhost:4000/auth/github/redirect"

    }, (accessToken, refreshToken, profile, done) => {

        // check if user exists
        console.log(profile);

        User.findOne({ ghID: profile.id }).then((currentUser) => {
            if (currentUser) {
                // already have this user
                console.log("user is:", currentUser);
                done(null, currentUser)
            } else {
                // if not, we create one
                new User({
                    ghID: profile.id,
                    name: profile.displayName,
                    email: profile._json.email

                }).save().then((newUser) => {

                    console.log("new user creates:" + newUser)
                    let token = newUser.generateAuthToken();
                    newUser.save()
                    done(null, newUser);
                })
            }
        });

    })

)