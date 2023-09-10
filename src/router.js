const express = require('express');
const router = express.Router();

//User routes
const userController = require('./controllers/userController');
const userMiddleware = require('./middlewares/userMiddleware');

router.post('/user', userMiddleware.validateCreateUser, userController.createUser);

//auth routes
const authController = require('./controllers/authController');
const authMiddleware = require('./middlewares/authMiddleware');

router.post('/login', authMiddleware.validadeAuth, authController.authLogin);


module.exports = router;