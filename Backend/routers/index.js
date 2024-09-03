const express = require('express');
const AuthController = require('../controllers/authController');
const userAuthentication = require('../middleware/userAuthentication');
const ItemController = require('../controllers/itemController');
const router = express.Router();

router.post('/login', AuthController.postLogin);
router.post('/register', AuthController.postRegister);

router.use(userAuthentication);

router.post('/items', ItemController.postItem);

module.exports = router;
