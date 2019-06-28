const router = require('express').Router();

//controllers
const UsersController = require('../controllers/usersController');

//routes
router.get(`/`, UsersController.index);
router.get(`/new`, UsersController.new);
router.get(`/:id`, UsersController.show);
router.post(`/`, UsersController.create);
router.get(`/:id/edit`, UsersController.edit);
router.post(`/update`, UsersController.update);
router.post(`/destroy`, UsersController.destroy);

module.exports = router;