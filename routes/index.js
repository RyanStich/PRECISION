var express = require('express');
var router = express.Router();

let about_controller = require('../controllers/aboutController');
let contact_controller = require('../controllers/contactController');
let home_controller = require('../controllers/homeController');
let quote_controller = require('../controllers/quotesController');
let services_controller = require('../controllers/servicesController');

// GET home page 
router.get('/', home_controller.home);


///////////// ABOUT ROUTES /////////////

// GET about company
router.get('/about', about_controller.about);



///////////// SERVICES ROUTES /////////////

// GET residential services
router.get('/services', services_controller.services);



///////////// FREE QUOTE /////////////

// GET free qoute
router.get('/free-appraisal-quote', quote_controller.free_quote_get);

// POST free quote
router.post('/free-appraisal-quote', quote_controller.free_quote_post);


///////////// CONTACT /////////////

// GET email form
router.get('/contact', contact_controller.contact_get);

// POST email form
router.post('/contact', contact_controller.contact_post);


module.exports = router;
