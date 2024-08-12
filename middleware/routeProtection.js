exports.noAccountOnly = (req, res, next) => {
  if (req.user) return res.redirect("/");
  else return next();
};

exports.userProtected = (req, res, next) => {
  if (!req.user) return res.redirect("/users/log-in");
  else return next();
};
