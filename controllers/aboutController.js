// get home page
exports.index = function (req, res) {
  res.render("home.html");
};


// get about company
exports.about = function (req, res) {
  res.render("about.html");
};
