const path = require("path");
const multer = require("multer");
const tmpDir = path.join(__dirname, "../tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },

  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({ storage });

module.exports = upload;
