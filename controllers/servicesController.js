var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
require("dotenv").config();
const validator = require("express-validator");
const { body, sanitizeBody, validationResult, Result } = require("express-validator");

// get residential page
exports.services_residential = function (req, res) {
  res.render("residential.html");
};

// get free quote
exports.free_quote_get = function (req, res) {
  res.render("quotes", { title: "Free Quotes" });
};

// post free quote 
exports.free_quote_post = [
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
  body("unit")
    .optional(),
  body("address")
    .optional(),
  body("postal")
    .optional(),
  body("propertyType")
    .isString()
    .withMessage('MUST BE STRING'),
  body("purpose")
    .isString(),
  body("info")
    .optional(),

 sanitizeBody('*').escape(),
//  error1: errors.array()[0].msg,
//  error2: errors.array()[1].msg,
//  error3: errors.array()[2].msg,

  
(req, res, next) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
      res.render("quotes", {
        form: req.body,
        errors: errors.array(),
        // error1: errors.array()[0].msg,
        selected: req.body.propertyType,
        selected2: req.body.purpose
      });
      return;
    } else {
      // Data from form IS valid
      const output = `
      <p>You have a new quote request!</p>
      <h3>Contact Information -</h3>
      <ul>  
        <li>Name: ${req.body.firstName} ${req.body.lastName}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
      </ul>
      <h3>Property Information -</h3>
      <ul>
        <li>Unit: ${req.body.unit}</li>
        <li>Address: ${req.body.address}</li>
        <li>Postal Code: ${req.body.postal}</li>
        <li>Type of Property: ${req.body.propertyType}</li>
        <li>Purpose of Appraisal: ${req.body.purpose}</li>

      </ul>
        <h3>Additional Information:</h3>
      <p> ${req.body.info}</p>
   `;

      // step 1
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      // step 2
      let mailOptions = {
        from: process.env.EMAIL,
        to: "jacksonmayhew9@gmail.com", // 'precisionappraisalgroup@shaw.ca' WHEN READY FOR PRODUCTION
        subject: "Free Quote Inquiry",
        html: output,
      };

      // step 3
      transporter
        .sendMail(mailOptions)
        .then(function (response) {
          console.log("Email sent!");
        })
        .catch(function (error) {
          console.log("Error! Email was not sent :(");
        });

      res.render("quotes", { sent: "Free Appraisal Quote Sent!" });
    }
  },
];


