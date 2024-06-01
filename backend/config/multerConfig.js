const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(path.join(__dirname, "..", "uploads", "blog-images"))) {
            fs.mkdirSync(path.join(__dirname, "..", "uploads", "blog-images"), { recursive: true });
        }
        cb(null, path.join(__dirname, "..", "uploads", "blog-images"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });
module.exports = upload;

