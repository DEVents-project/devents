const Route = require("express").Router();
const upload = require("../middleware/gridFsStorage");
const { postWorkshopImage, getWorkshopImgInfo, getImage } = require("../controllers/imgWorkshopController");

Route.post("/", upload.single("file"), postWorkshopImage);

Route.get("/", getWorkshopImgInfo);

Route.get("/:filename", getImage);


module.exports = Route;
