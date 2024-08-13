const multer = require("multer");

const upload = multer({
  dest: "./uploadsTemp",
  limits: { fileSize: 1000000, files: 1 },
});

module.exports = upload;
