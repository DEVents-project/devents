const Route = require("express").Router();
const upload = require("../middleware/gridFsStorage");
const { postConventionImage, getConventionImgInfo, getImage } = require("../controllers/imgConventionController")

Route.post("/", upload.single("file"), postConventionImage)

Route.get("/", getConventionImgInfo)

Route.get("/:filename", getImage)


module.exports = Route

