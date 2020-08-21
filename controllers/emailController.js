var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
require("dotenv").config();
const validator = require("express-validator");
const { body, sanitizeBody, validationResult, Result } = require("express-validator");


exports.email_page_get = function(req, res) {
    res.render('email')
}

exports.email_page_post = [
    body("name")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Name must be specified"),
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email"),
  body("phone")
    .optional({checkFalsy: true})
    .isNumeric()
    .withMessage('Invalid phone number'),
    body("msg")
    .isLength({min: 1})
    .withMessage('Please enter a message'),

    sanitizeBody('*').escape(),
    
      
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.render("email", {
            form: req.body,
            errors: errors.array(),
          });
          return;
        } else {
          // Data from form IS valid
          const output = `
          <p>You have a new contact request!</p>
          <h3>Contact Information:</h3>
          <ul>  
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
          </ul>
          <h3>Message:</h3>
          <p> ${req.body.msg}</p>
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
            subject: "Contact Request",
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
    
          res.render("email", {sent: "Your E-mail was sent!" });
        }
      },
]