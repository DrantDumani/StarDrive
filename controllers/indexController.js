exports.dashboard = (req, res, next) => {
  res.render("dashboard", {
    title: "Star Drive",
    username: req.user.username,
  });
};
