var nodemailer = require("nodemailer");
require("dotenv").config();
const { body, sanitizeBody, validationResult, Result} = require("express-validator");

// get free quote
exports.free_quote_get = function (req, res) {
  res.render("quote", { title: "Free Quotes" });
};

// post free quote
exports.free_quote_post = [
  body("name")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Please enter your name"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("phone")
    .isNumeric()
    .withMessage("Invalid phone number"),
  body("address")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Please enter your address"),
  body("postal").optional(),
  body("propertyType").isString(),
  body("purpose").isString(),
  body("info").optional(),

  sanitizeBody("*").escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    let errArray = errors.array();

    let errorsObj = {};
    errArray.map((item) => {
      const id = item.param;
      delete item.param;
      errorsObj[id] = item;
    });

    if (!errors.isEmpty()) {
      res.render("quote", {
        form: req.body,
        errors: errorsObj,
        selected: req.body.propertyType,
        selected2: req.body.purpose,
      });
      return;
    } else {
      // Data from form IS valid
      const output = `
        <p>You have a new quote request!</p>
        <h3>Contact Information:</h3>
        <ul>  
          <li>Name: ${req.body.name}</li>
          <li>Email: ${req.body.email}</li>
          <li>Phone: ${req.body.phone}</li>
        </ul>
        <h3>Property Information:</h3>
        <ul>
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
        to: process.env.SENDTO, // 'precisionappraisalgroup@shaw.ca' WHEN READY FOR DEPLOYMENT
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
      res.render("quote", { sent: "Your Quote Request Was Sent!" });
    }
  },
];
