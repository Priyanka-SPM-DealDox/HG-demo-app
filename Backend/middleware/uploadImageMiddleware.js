const multer = require("multer");
const path = require("path");
const fs = require('fs');

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const uploadFolder = `./public/files`;
    fs.mkdir(uploadFolder, { recursive: true }, (err) => {
      err ?  cb(err, null) : cb(null, uploadFolder);
    });
  },
  filename: async function (req, file, cb) {
    cb(null, Date.now()+ file.originalname);
  },
});

const uploadMiddleware = multer({ storage: storage });

module.exports = uploadMiddleware;
