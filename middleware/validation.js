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
