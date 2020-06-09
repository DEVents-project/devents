const express = require("express");
const server = express();
const createError = require("http-errors");
const mongoose = require("mongoose");
const logger = require("morgan");
const multer = require("multer")


const indexRoute = require("./routes/indexRoute");
const eventRoute = require("./routes/eventRoute");
const userRoute = require("./routes/userRoute");
const workshopRoute = require("./routes/workshopRoute");
const conventionRoute = require("./routes/conventionRoute");
const imgRoute = require("./routes/imgRoute")
const { cors } = require("./middleware/security");

const port = process.env.PORT || 4000;

mongoose.connect("mongodb://127.0.0.1:27017/devents", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", (err) => console.log(err));
mongoose.connection.on("open", () => console.log("database connected"));



server.use(express.json());
server.use(logger("dev"));
server.use(cors)
server.use(express.urlencoded({ extended: false }))



server.use("/", indexRoute);
server.use("/users", userRoute)
server.use("/events", eventRoute);
server.use("/workshops", workshopRoute)
server.use("/conventions", conventionRoute)
server.use("/image", imgRoute)

server.use((req, res, next) => {
    next(createError(404));
});

server.use((err, req, res, next) => {
    res.json({ status: err.status, err: err.message });
});

server.listen(port, () => console.log(`server is running on port ${port}`));

