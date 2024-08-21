const { Router } = require("express");
const routeProtection = require("../middleware/routeProtection");
const upload = require("../multer/multerConfig");
const fileController = require("../controllers/fileController");

const router = Router();

// render all content inside of file
router.get(
  "/:fileId",
  routeProtection.userProtected,
  fileController.getFileData
);

// download file
router.get(
  "/:fileId/download",
  routeProtection.userProtected,
  fileController.downloadFileData
);

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
router.get(
  "/:fileId/delete",
  routeProtection.userProtected,
  fileController.getFileDelete
);

// confirm delete
router.post(
  "/:fileId/delete",
  routeProtection.userProtected,
  fileController.post_delete_file
);

module.exports = router;
