const express = require('express');
const AuthController = require('../controllers/authController');
const router = express.Router();

router.post('/login', AuthController.postLogin);
router.post('/register', AuthController.postRegister);

module.exports = router;
