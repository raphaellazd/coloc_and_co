import multer from 'multer';
// const path = require("node:path");

const storageConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/avatar');
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname.split(' ').join('_')}`);
  },
});
// file filter for filtering only images
const fileFilterConfig = function(req, file, cb) {
  if (file.mimetype === "image/jpeg"
      || file.mimetype === "image/png") {
    // calling callback with true
    // as mimetype of file is image
    cb(null, true);
  } else {
    // false to indicate not to store the file
    cb(null, false);
  }
};

// creating multer object for storing
// with configuration
const upload = multer({
  // applying storage and file filter
  storage: storageConfig,
  limits: {
    // limits file size to 5 MB
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilterConfig,
});

export default upload;
