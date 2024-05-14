
const multer = require('multer');
const path = require('path');

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      const uniqueFileName = Date.now() + path.extname(file.originalname);
      cb(null, uniqueFileName);
    },
  }),
}).array('file');


module.exports ={
  upload,
}