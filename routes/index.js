const { Router } = require("express");

const router = Router();

// render dashboard
// dashboard displays all files and folders that aren't in folders
router.get("/", (req, res) => {
  res.send("Renders the dashboard page. Protected route");
});

module.exports = router;
