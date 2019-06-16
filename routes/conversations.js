const router = require('express').Router();

//controllers
const ConversationsController = require('../controllers/conversationsController');

//routes
router.get(`/`, ConversationsController.index);
router.get(`/new`, ConversationsController.new);
router.get(`/:id`, ConversationsController.show);
router.post(`/`, ConversationsController.create);
//router.get(`/:id/edit`, ConversationsController.edit);
//router.post(`/update`, ConversationsController.update);
//router.post(`/destroy`, ConversationsController.destroy);

module.exports = router;