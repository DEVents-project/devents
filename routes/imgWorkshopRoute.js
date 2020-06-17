const Route = require("express").Router();
const upload = require("../middleware/gridFsStorage");
const Image = require("../models/imgWorkshopSchema")

Route.post("/", upload.single("file"), async (req, res) => {

    let addImage = new Image(
        { imgUrl: `${req.file.filename}` }
    )
    await addImage.save();

    res.json({ addImage })

})
Route.get("/", async (req, res) => {
    let workshopImages = await Image.find();
    res.json({ workshopImages })
})


module.exports = Route
