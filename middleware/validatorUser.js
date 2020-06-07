const { body, validationResult } = require("express-validator");

exports.validateUser = () => {
    return [
        body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Invalid email"),

        body("password")
            .isLength({ min: 6 })
            .withMessage("Password is too short"),

        (req, res, next) => {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                let err = errors.errors.map(er => ({ [er.param]: er.msg }));
                return res.json({ status: 203, message: err });
            };
            next();
        }
    ];

};
