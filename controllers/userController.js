const createError = require("http-errors");
const User = require("../models/usersSchema");
const Event = require("../models/eventSchema");
const Workshop = require("../models/workshopSchema");
const Convention = require("../models/conventionSchema");
const { encrypt } = require("../lib/encryption");


exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json({ success: true, users: users });
    } catch (err) {
        next(err);
    }
};

exports.getUser = async (req, res, next) => {
    const { token } = req.header;
    const { _id } = req.user;
    try {
        const user = await User.findById(_id).populate('events').populate('favoriteMeetups').populate('favoriteWorkshops').populate('favoriteConventions').exec();
        res.json({ success: true, user: user });
    } catch (err) {
        next(err);
    }
};

exports.postUser = async (req, res, next) => {
    try {
        const user = new User(req.body);
        const token = user.generateAuthToken();
        await user.save();
        const data = user.getPublicFields();
        res.header("x-auth", token).json({ success: true, user: data });
    } catch (err) {
        next(err);
    }
};

exports.putUser = async (req, res, next) => {
    const user = req.body;

    try {
        if (Object.keys(req.body).includes("password")) {
            const hashedPassword = await encrypt(user.password);
            user.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(req.user._id, user, { new: true }).populate("events").populate("favoriteMeetups").populate("favoriteWorkshops").populate("favoriteConventions").exec();
        if (!updatedUser) throw createError(500);
        // console.log('updatedUser: ', updatedUser);

        res.json({ success: true, user: updatedUser });
    } catch (err) {
        next(err);
    }
};

exports.addFav = async (req, res, next) => {

    const eventId = req.params.id;
    // console.log('PARAMS ID: ', eventId);

    try {
        let userData = await User.findById(req.user._id);
        const favMeetup = await Event.findById(eventId);
        const favWorkshop = await Workshop.findById(eventId);
        const favConvention = await Convention.findById(eventId);

        // console.log('USER DATA BEFORE: ', userData);

        if (favMeetup) {

            if (userData.favoriteMeetups.includes(favMeetup._id)) {

                const newFavMeetups = userData.favoriteMeetups.filter(meetup => meetup._id.toString() !== favMeetup._id.toString());
                userData.favoriteMeetups = newFavMeetups;
                userData.save();
                res.json({ success: true, user: userData, star: false });

            } else {

                userData.favoriteMeetups.push(favMeetup._id);
                userData.save();
                res.json({ success: true, user: userData, star: true });
            }

        } else if (favWorkshop) {

            if (userData.favoriteWorkshops.includes(favWorkshop._id)) {

                const newFavWorkshops = userData.favoriteWorkshops.filter(workshop => workshop._id.toString() !== favWorkshop._id.toString());
                userData.favoriteWorkshops = newFavWorkshops;
                userData.save();
                res.json({ success: true, user: userData, star: false });

            } else {

                userData.favoriteWorkshops.push(favWorkshop._id);
                userData.save();
                res.json({ success: true, user: userData, star: true });
            }

        } else if (favConvention) {

            if (userData.favoriteConventions.includes(favConvention._id)) {

                const newFavConventions = userData.favoriteConventions.filter(convention => convention._id.toString() !== favConvention._id.toString());
                userData.favoriteConventions = newFavConventions;
                userData.save();
                res.json({ success: true, user: userData, star: false });

            } else {

                userData.favoriteConventions.push(favConvention._id);
                userData.save();
                res.json({ success: true, user: userData, star: true });
            }
        }

    } catch (err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    const eventId = req.header('eventId');
    // console.log('EVENT ID: ', eventId);
    try {
        const user = await User.findByIdAndDelete(eventId);
        if (!user) throw createError(404);
        res.json({ success: true, user: user });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        const valid = await user.checkPassword(password);
        if (!valid) throw createError(403);
        let token = user.generateAuthToken();
        const data = user.getPublicFields();

        res.header("x-auth", token).json({ success: true, user: data });
    } catch (err) {
        next(err);
    }
};