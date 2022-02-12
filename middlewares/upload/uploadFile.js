const multer = require('multer');

const { tempDir } = require('../../constants/');

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
  limits: {
    fileSize: 25600,
  },
});

module.exports = upload;
