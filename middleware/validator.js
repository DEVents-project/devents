const { body, validationResult } = require("express-validator")

exports.validateInputs = () => {
    return [
        body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("invalid email"),

        body("password")
            .isLength({ min: 5 })
            .withMessage("password is too short"),

        (req, res, next) => {

            let errors = validationResult(req)
            if (!errors.isEmpty()) {
                let err = errors.errors.map(er => ({ [er.param]: er.msg }))
                return res.json({ status: 203, message: err })
            }

            next()

        }

    ]
}