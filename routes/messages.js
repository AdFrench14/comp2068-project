const router = require('express').Router();

//controllers
const MessagesController = require('../controllers/messagesController');

//routes
router.get(`/`,MessagesController.index);
router.post(`/update`,MessagesController.update);
router.get(`/:id`,MessagesController.show);
router.post(`/`,MessagesController.create);
router.post(`/destroy`,MessagesController.destroy);

module.exports = router;