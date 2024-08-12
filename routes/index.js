const { Router } = require("express");

const router = Router();

// render dashboard
// dashboard displays all files and folders that aren't in folders
// protected route. redirects to login page when user is not logged in
router.get("/", (req, res) => {
  if (!req.user) {
    return res.redirect("/users/log-in");
  }
  res.send(
    "Renders the dashboard page. Protected route. Welcome " + req.user.username
  );
});

module.exports = router;
