exports.noAccountOnly = (req, res, next) => {
  if (req.user) return res.redirect("/");
  else return next();
};

exports.userProtected = (req, res, next) => {
  if (!req.user) return res.redirect("/users/log-in");
  else return next();
};

exports.verifyShareId = (req, res, next) => {
  // query share id and see if it's valid
  // share id is valid if it both exists and if it hasn't expired yet
};
