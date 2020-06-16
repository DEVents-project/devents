const Route = require("express").Router();
const upload = require("../middleware/gridFsStorage");
const Image = require("../models/imgConventionSchema")

Route.post("/", upload.single("file"), async (req, res) => {

    let addImage = new Image(
        { imgUrl: `${req.file.filename}` }
    )


    await addImage.save();

    res.json({ addImage })

})
Route.get("/", async (req, res) => {
    let conventionsImages = await Image.find();
    res.json({ conventionsImages })
})


module.exports = Route

