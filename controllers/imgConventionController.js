const Grid = require("gridfs-stream");
const Image = require("../models/imgConventionSchema")
const mongoose = require("mongoose")

// Mongo URI
const mongoURI = 'mongodb://127.0.0.1:27017/devents';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

//Init gfs
let gfs;

conn.once('open', () => {
    //Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
})


exports.getImage = async (req, res) => {

    // console.log(req.params.filename)
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        res.contentType("image/png")
        const readStream = gfs.createReadStream(file.filename);
        console.log(file, "file")
        readStream.pipe(res)
    })
};

exports.postConventionImage = async (req, res) => {

    let addImage = new Image(
        { imgUrl: `${req.file.filename}` }
    )

    await addImage.save();

    res.json({ addImage })

}

exports.getConventionImgInfo = async (req, res) => {
    let conventionImages = await Image.find();
    res.json({ conventionImages })
}