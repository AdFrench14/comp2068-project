const router = require('express').Router();

//controllers
const MessagesController = require('../controllers/messagesController');

//routes
router.get(`/`,MessagesController.index);
router.get(`/new`,MessagesController.new);
router.get(`/:id`,MessagesController.show);
router.post(`/`,MessagesController.create);
//router.get(`/:id/edit`,MessagesController.edit);

module.exports = router;