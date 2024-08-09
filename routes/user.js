const { Router } = require("express");

const router = Router();
// sign up
router.post("/sign-up", (req, res) => {
  res.send("User can sign up");
});

// log in
router.post("/log-in", (req, res) => {
  res.send("User can log in");
});

// log out
router.post("/log-out", (req, res) => {
  res.send("User can log out");
});

module.exports = router;
