const express = require('express');

const router = express.Router();

const usersController = require('../controller/users.controllers');
const validateResetToken = require('../middlewares/validateResetToken')

router.get('/',usersController.getUsers)
        
router.post('/register', usersController.register);
router.post('/login', usersController.login);

router.post('/forgot-password', usersController.forgotPassword);

router.post('/reset-password', validateResetToken, usersController.resetPassword)


router.route('/:id')
        .get(usersController.getUserById)
        .patch()
        .delete()

module.exports = router ; 