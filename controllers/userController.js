const client = require("../prisma/client");
const bcrypt = require("bcrypt");
const passport = require("../passportConfig/passportConfig");

exports.get_login_form = (req, res, next) => {
  return res.render("log-in", {
    title: "Log In",
  });
};

exports.post_login = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.render("log-in", {
        title: "Log In",
        failureMsg: "Invalid Credentials",
      });
    } else {
      req.login(user, (err) => {
        if (err) return next(err);
        return res.redirect("/");
      });
    }
  })(req, res, next);
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
    if (err.code === "P2002") {
      return res.render("sign-up", {
        title: "Sign Up",
        username: req.body.username,
        email: req.body.email,
        dbError: "An account using these credentials already exists",
      });
    } else throw new Error(err);
  }
};

exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    res.redirect("/users/log-in");
  });
};
