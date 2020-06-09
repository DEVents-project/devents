const createError = require("http-errors");
const User = require("../models/usersSchema");
const { encrypt } = require("../lib/encryption");


exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json({ success: true, users: users })
    } catch (err) {
        next(err)
    }
}

exports.getUser = async (req, res, next) => {
    const { id } = req.params
    try {
        const user = User.findById(id)
        if (!user) throw createError(404)
        res.json({ success: true, user: user })
    } catch (err) {
        next(err)
    }
}

exports.postUser = async (req, res, next) => {

    try {
        const user = new User(req.body);
        const token = user.generateAuthToken()
        await user.save()
        const data = user.getPublicFields()
        res.header("x-auth", token).json({ success: true, user: data })
    } catch (err) {
        next(err)
    }

}

exports.putUser = async (req, res, next) => {
    const { _id } = req.body;
    const user = req.body;
    try {
        if (Object.keys(req.body).includes("password")) {
            const hashedPassword = await encrypt(user.password)
            user.password = hashedPassword
        }
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true })
        if (!updatedUser) throw createError(500)
        res.json({ success: true, user: updatedUser })
    } catch (err) {
        next(err)
    }
}

exports.deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id)
        if (!user) throw createError(404)
        res.json({ success: true, user: user })
    } catch (err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        const valid = await user.checkPassword(password)
        if (!valid) throw createError(403)
        let token = user.generateAuthToken()
        const data = user.getPublicFields()

        res.header("x-auth", token).json({ success: true, user: data })
    } catch (err) {
        next(err)
    }
}