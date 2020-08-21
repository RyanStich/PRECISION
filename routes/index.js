var express = require('express');
var router = express.Router();

let about_controller = require('../controllers/aboutController');
let services_controller = require('../controllers/servicesController');
let email_controller = require('../controllers/emailController');

// GET home page 
router.get('/', about_controller.index);


///////////// ABOUT ROUTES /////////////

// GET about company
router.get('/about', about_controller.about);



///////////// SERVICES ROUTES /////////////

// GET residential services
router.get('/services', services_controller.services);



///////////// FREE QUOTE /////////////

// GET free qoute
router.get('/free-appraisal-quote', services_controller.free_quote_get);

// POST free quote
router.post('/free-appraisal-quote', services_controller.free_quote_post);


///////////// CONTACT /////////////

// GET email form
router.get('/contact', email_controller.contact_get);

// POST email form
router.post('/contact', email_controller.contact_post);


module.exports = router;
