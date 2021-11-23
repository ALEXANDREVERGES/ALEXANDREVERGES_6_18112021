//**utilisation express pour pouvoir créer un router */
const express = require('express');
const router = express.Router();

const emailControl = require('../middleware/email');
const passwordControl = require('../middleware/password');
const userCtrl = require('../controllers/user');


router.post('/signup', emailControl, passwordControl, userCtrl.signup);
router.post('/login', userCtrl.login);
module.exports = router;