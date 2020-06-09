const GridFsStorage = require('multer-gridfs-storage');
const mongoURI = 'mongodb://127.0.0.1:27017/devents';
const multer = require("multer")

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const fileName = file.originalname;
            const fileInfo = {
                filename: fileName,
                bucketName: "uploads"
            };
            resolve(fileInfo);
        })
    }
})

const upload = multer({ storage })

module.exports = upload;