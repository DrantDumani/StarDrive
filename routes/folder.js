const { Router } = require("express");
const validator = require("../middleware/validation");
const routeProtection = require("../middleware/routeProtection");
const folderController = require("../controllers/folderController");

const router = Router();

// render all content inside of folder
router.get(
  "/:folderId",
  routeProtection.userProtected,
  folderController.get_folder
);

// create new folder
router.post(
  "/create",
  routeProtection.userProtected,
  validator.validateFolderName(),
  validator.validateFolderCreate,
  folderController.createFolder
);

// removed route
// router.post(
//   "/:folderId/create",
//   routeProtection.userProtected,
//   validator.validateFolderName(),
//   validator.validateFolderCreate,
//   folderController.createNestedFolder
// );

// edit the folder
router.post(
  "/:folderId/edit",
  routeProtection.userProtected,
  validator.validateFolderName(),
  validator.validateFolderCreate,
  folderController.editFolder
);

// visit delete page for folder
router.get(
  "/:folderId/delete",
  routeProtection.userProtected,
  folderController.delete_folder_get
);

// confirm delete
router.post(
  "/:folderId/delete",
  routeProtection.userProtected,
  folderController.delete_folder_post
);

module.exports = router;
