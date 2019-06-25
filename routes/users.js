const router = require('express').Router();

//controllers
const UsersController = require('../controllers/usersController');

//routes
router.get(`/`, UsersController.index);
router.get(`/new`, UsersController.new);
router.post(`/`, UsersController.create);
router.post(`/update`, UsersController.update);
router.post(`/destroy`, UsersController.destroy);
router.get(`/:id`, UsersController.show);
router.get(`/:id/edit`, UsersController.edit);
module.exports = router;