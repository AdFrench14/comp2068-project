const router = require('express').Router();

//controllers
const MessagesController = require('../controllers/messagesController');

//routes
router.get(`/`,MessagesController.index);
router.get(`/new`, MessagesController.new);
router.post(`/update`,MessagesController.update);
router.post(`/`,MessagesController.create);
router.post(`/destroy`,MessagesController.destroy);
//router.get(`/:id`,MessagesController.show); //not necessary because don't need to show a single message

module.exports = router;