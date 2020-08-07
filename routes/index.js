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







module.exports = router;
