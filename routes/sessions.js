const router = require('express').Router();

const SessionsController = require('../controllers/sessionsController');

// Our Routes
router.get(`/login`, SessionsController.login);
router.post(`/authenticate`, SessionsController.authenticate);
router.get(`/logout`, SessionsController.logout);

module.exports = router;