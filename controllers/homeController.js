var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
require("dotenv").config();
const { body, sanitizeBody, validationResult, Result } = require("express-validator");


// get home page
exports.home = function (req, res) {
    res.render("home");
  };

// post contact form on homepage
  exports.home_post = [
    body("name")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Please enter your name"),
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .isLength({ min: 1})
    .withMessage('Please enter your email adress'),
  body("phone")
    // .optional({checkFalsy: true}) if it was an optional field
    .isNumeric()
    .withMessage('Invalid phone number')
    .isLength({ min: 1})
    .withMessage('Please enter your phone number'),
    body("message")
    .isLength({min: 1})
    .withMessage('Please enter your message'),

    sanitizeBody('*').escape(),
    
      
    (req, res, next) => {
        const errors = validationResult(req);

        // manipulate validation results array so that we can display them individually
        let errArray = errors.array()
        let errorsObj = {};
        errArray.map((item) => {
          const id = item.param;
          delete item.param;
          errorsObj[id] = item;
        });
        

        if (!errors.isEmpty()) {
          res.render("home", {
            form: req.body,
            errors: errorsObj,
          });
          return;
        } else {
          // Data from form IS valid - create format for email being sent
          const output = `
          <p>You have a new contact request!</p>
          <h3>Contact Information:</h3>
          <ul>  
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
          </ul>
          <h3>Message:</h3>
          <p> ${req.body.message}</p>
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
            to: "jacksonmayhew9@gmail.com", // 'precisionappraisalgroup@shaw.ca' WHEN READY FOR DEPLOYMENT
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
    
          res.render("home", {sent: "Your email was sent!" });
        }
      },
]