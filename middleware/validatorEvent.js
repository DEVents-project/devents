const { body, validationResult } = require("express-validator");

exports.validateInputs = () => {
    return [
        body("name")
            .exists()
            .isLength({ min: 4 })
            .withMessage("Please provide valid event name"),

        body("hostedBy")
            .isLength({ min: 3 })
            .withMessage("Please provide valid host name"),

        body("date")
            .isLength({ min: 10, max: 10 })
            .withMessage("Please provide a full date dd/mm/yyyy"),

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