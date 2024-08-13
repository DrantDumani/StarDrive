const { Router } = require("express");
const routeProtection = require("../middleware/routeProtection");
const upload = require("../multer/multerConfig");
const fileController = require("../controllers/fileController");

const router = Router();

// render all content inside of file
router.get("/:fileId", (req, res) => {
  res.send("Render file details such as size, name, creation date, and type");
});

// create new file
router.post(
  "/create",
  routeProtection.userProtected,
  upload.single("file"),
  fileController.uploadFileToRoot
);

router.post(
  "/:folderId/create",
  routeProtection.userProtected,
  upload.single("file"),
  fileController.uploadNestedFile
);

// visit delete page for file
router.get("/:fileId/delete", (req, res) => {
  res.send("Visit the delete confirmation page of the file you're in.");
});

// confirm delete
router.post("/:fileId/delete", (req, res) => {
  res.send("Delete the file for good");
});

module.exports = router;
