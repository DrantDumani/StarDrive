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

router.post(
  "/:folderId/create",
  routeProtection.userProtected,
  validator.validateFolderName(),
  validator.validateFolderCreate,
  folderController.createNestedFolder
);

// edit the folder
router.post("/:folderId/edit", (req, res) => {
  res.send("Update the name of the folder you're in");
});

// visit delete page for folder
router.get("/:folderId/delete", (req, res) => {
  res.send("Visit the delete confirmation page of the folder you're in.");
});

// confirm delete
router.post("/:folderId/delete", (req, res) => {
  res.send("Delete the folder for good");
});

module.exports = router;
