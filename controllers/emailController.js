var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
require("dotenv").config();
const validator = require("express-validator");
const { body, sanitizeBody, validationResult, Result } = require("express-validator");


exports.email_page_get = function(req, res) {
    res.render('email')
}

exports.email_page_post = [
    body("firstName")
    .isLength({ min: 1 })
    .trim()
    .withMessage("First name must be specified"),
  body("lastName")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Last name must be specified"),
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email"),
  body("phone")
    .optional({checkFalsy: true})
    .isNumeric()
    .withMessage('Invalid phone number'),
]