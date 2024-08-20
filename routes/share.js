const { Router } = require("express");
const routeProtection = require("../middleware/routeProtection");
const validator = require("../middleware/validation");
const shareController = require("../controllers/shareController");

const router = Router();

// render folder being shared
router.get(
  "/:shareId",
  routeProtection.verifyShareId,
  shareController.getShareFolder
);

// render file inside of shared folder
router.get(
  "/:shareId/:fileId",
  routeProtection.verifyShareId,
  shareController.getShareFile
);

// create share link for specific folder
router.post(
  "/:folderId",
  routeProtection.userProtected,
  validator.validateShareOptions,
  validator.validateShareCreate,
  shareController.createShareLink
);
