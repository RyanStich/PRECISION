var express = require('express');
var router = express.Router();


let about_controller = require('../controllers/aboutController');
let services_controller = require('../controllers/servicesController');

// GET home page 
router.get('/', about_controller.index);


///////////// ABOUT ROUTES /////////////


// GET about company
router.get('/about/company', about_controller.about_company);


// GET about municipalities
router.get('/about/municipalities', about_controller.about_municipalities);



///////////// SERVICES ROUTES /////////////

// GET residential services
router.get('/services/residential', services_controller.services_residential);

// GET consulting services
router.get('/services/consulting', services_controller.services_consulting);





///////////// FREE QUOTE /////////////


// GET free qoute
router.get('/free-appraisal-quote', services_controller.free_quote_get);

// POST free quote
router.post('/free-appraisal-quote', services_controller.free_quote_post);






module.exports = router;
