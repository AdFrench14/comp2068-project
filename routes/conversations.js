const router = require('express').Router();

//controllers
const ConversationsController = require('../controllers/conversationsController');

//routes
router.get(`/`, ConversationsController.index);
router.post(`/`, ConversationsController.create);
router.post(`/destroy`, ConversationsController.destroy);
router.get(`/:id`, ConversationsController.show);

module.exports = router;