const router = require('express').Router();
const { register, login } = require('../controllers/authController');
const validateUserObject = require('../validators/userValidator');

router.post('/register', validateUserObject, register);
router.post('/login', validateUserObject, login);

module.exports = router;
