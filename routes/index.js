const { Router } = require("express");
const indexController = require("../controllers/indexController");
const routeProtection = require("../middleware/routeProtection");

const router = Router();

// render dashboard
// dashboard displays all files and folders that aren't in folders
// protected route. redirects to login page when user is not logged in
router.get("/", routeProtection.userProtected, indexController.dashboard);

module.exports = router;
