const GridFsStorage = require('multer-gridfs-storage');
const env = require("./config/config")
const mongoURI = env.MONGO_PROD;
const multer = require("multer")

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: "uploads"
            };
            resolve(fileInfo);
        })
    }
})

const upload = multer({ storage })

module.exports = upload;