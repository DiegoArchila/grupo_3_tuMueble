const multer = require("multer");
const path = require("path");

const saveOneImage = (urlDestination) => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, urlDestination);
    },
    filename: function (req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`
      );
    },
  });
  var upload = multer({ storage: storage });

  return upload;
};

module.exports = {
  saveOneImage,
};
