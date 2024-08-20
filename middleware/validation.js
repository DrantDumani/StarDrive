const { body, validationResult } = require("express-validator");

exports.signUpValidationRules = () => {
  return [
    body("username", "Name should be at least 3 characters long")
      .isString()
      .bail()
      .trim()
      .isLength({ min: 3 }),
    body("email", "Invalid email").isEmail(),
    body("password", "Password must be at least 8 characters")
      .isString()
      .bail()
      .isLength({ min: 8 }),
    body("confirmPw", "Passwords must match")
      .isString()
      .bail()
      .custom((value, { req }) => {
        return value === req.body.password;
      }),
  ];
};

exports.validateSignUp = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();
  else {
    return res.render("sign-up", {
      title: "Sign Up",
      username: req.body.username,
      email: req.body.email,
      errors: errors,
    });
  }
};

exports.validateFolderName = () => {
  return [
    body("folderName", "Folder name cannot be empty")
      .isString()
      .trim()
      .isLength({ min: 1 }),
  ];
};

exports.validateFolderCreate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  else {
    return res.render("dashboard", {
      title: "Star Drive",
      username: req.user.username,
    });
  }
};

exports.validateShareOptions = (req, res, next) => {
  // make sure the value for day is a number > 0
  // also, it's gotta be an integer
  // if it's not, re-render the form with the error
};

exports.validateShareCreate = (req, res, next) => {
  // check errors and decide to proceed to the next route or send errors
};
