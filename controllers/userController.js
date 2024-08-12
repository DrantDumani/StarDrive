const client = require("../prisma/client");
const bcrypt = require("bcrypt");

exports.get_login_form = (req, res, next) => {
  return res.render("log-in", {
    title: "Log In",
  });
};

exports.get_signUp_form = (req, res, next) => {
  return res.render("sign-up", {
    title: "Sign Up",
  });
};

exports.post_signUp = async (req, res, next) => {
  try {
    const hashPw = await bcrypt.hash(req.body.password, 10);
    const user = await client.users.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: hashPw,
      },
    });
    req.login(user, (err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  } catch (err) {
    console.error(err.code);
    if (err.code === "P2002") {
      return res.render("sign-up", {
        title: "Sign Up",
        username: req.body.username,
        email: req.body.email,
        dbError: "An account using these credentials already exists",
      });
    }
  }
};
