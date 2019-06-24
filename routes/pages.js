const router = require('express').Router();

//controllers
const PagesController = require('../controllers/pagesController');

//routes
router.get(`/`, PagesController.show);


module.exports = router;