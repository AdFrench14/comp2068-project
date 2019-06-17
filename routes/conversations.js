const router = require('express').Router();

//controllers
const ConversationsController = require('../controllers/conversationsController');

//routes
router.get(`/`, ConversationsController.index);
router.get(`/:id`, ConversationsController.show);
router.post(`/`, ConversationsController.create);
router.post(`/destroy`, ConversationsController.destroy);

module.exports = router;