var express = require('express');
var router = express.Router();

let home_controller = require('../controllers/homeController');
let quote_controller = require('../controllers/quotesController');

///////////// HOME PAGE /////////////

// GET home page 
router.get('/', home_controller.home);

// POST home page contact form
router.post('/', home_controller.home_post);

// router.post('/form2', home_controller.form2)


///////////// FREE QUOTE /////////////

// GET free qoute
router.get('/free-quote', quote_controller.free_quote_get);

// POST free quote
router.post('/free-quote', quote_controller.free_quote_post);



module.exports = router;
