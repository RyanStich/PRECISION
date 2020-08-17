var express = require('express');
var router = express.Router();


let about_controller = require('../controllers/aboutController');
let services_controller = require('../controllers/servicesController');
let email_controller = require('../controllers/emailController');

// GET home page 
router.get('/', about_controller.index);


///////////// ABOUT ROUTES /////////////

// GET about company
router.get('/about/company', about_controller.about_company);



///////////// SERVICES ROUTES /////////////

// GET residential services
router.get('/services/residential', services_controller.services_residential);



///////////// FREE QUOTE /////////////

// GET free qoute
router.get('/free-appraisal-quote', services_controller.free_quote_get);

// POST free quote
router.post('/free-appraisal-quote', services_controller.free_quote_post);


///////////// EMAIL PAGE /////////////

// GET email page
router.get('/email-us', email_controller.email_page);



module.exports = router;
