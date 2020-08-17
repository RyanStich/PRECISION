// get home page
exports.index = function (req, res) {
  res.render("home.html");
};

// get about company
exports.about_company = function (req, res) {
  res.render("company.html");
};
