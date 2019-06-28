const router = require('express').Router();

//controllers
const MessagesController = require('../controllers/messagesController');

//routes
//No need for index. Would lead to the same content as /conversations/:id show method
//no need for show. We decided a chat app didn't need to display all the details of a single m
router.post(`/update`,MessagesController.update);
router.post(`/`,MessagesController.create);
router.post(`/destroy`,MessagesController.destroy);
router.get(`/:convoId/:messageId/edit`, MessagesController.edit); //included convoId because messages are nested inside convo in the mongoDB
router.get(`/:convoId/:messageId`, MessagesController.show);

module.exports = router;