exports.cors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, x-Request-With, Content-Type, Accept, x-auth, eventId");
    res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE,OPTIONS,PATCH");
    res.header("Access-Control-Expose-Headers", "*");
    next();
};