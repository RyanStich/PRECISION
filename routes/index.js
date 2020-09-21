var express = require('express');
var router = express.Router();

let contact_controller = require('../controllers/contactController');
let home_controller = require('../controllers/homeController');
let quote_controller = require('../controllers/quotesController');

///////////// HOME PAGE /////////////

// GET home page 
router.get('/', home_controller.home);

// POST home page contact form
router.post('/', home_controller.home_post);

///////////// FREE QUOTE /////////////

// GET free qoute
router.get('/free-quote', quote_controller.free_quote_get);

// POST free quote
router.post('/free-quote', quote_controller.free_quote_post);


///////////// CONTACT /////////////

// GET email form
router.get('/contact', contact_controller.contact_get);

// POST email form
router.post('/contact', contact_controller.contact_post);


module.exports = router;
