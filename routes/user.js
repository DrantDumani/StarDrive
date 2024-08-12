const { Router } = require("express");
const userController = require("../controllers/userController");
const routeProtection = require("../middleware/routeProtection");
const validate = require("../middleware/validation");

const router = Router();
// get sign up form. redirect to dashboard if already logged in
router.get(
  "/sign-up",
  routeProtection.noAccountOnly,
  userController.get_signUp_form
);

// sign up
router.post(
  "/sign-up",
  routeProtection.noAccountOnly,
  validate.signUpValidationRules(),
  validate.validateSignUp,
  userController.post_signUp
);

//  GET log in form. redirect to dashboard if already logged in
router.get(
  "/log-in",
  routeProtection.noAccountOnly,
  userController.get_login_form
);

// log in
router.post("/log-in", (req, res) => {
  res.send("User can log in");
});

// log out
router.post("/log-out", (req, res) => {
  res.send("User can log out");
});

module.exports = router;
