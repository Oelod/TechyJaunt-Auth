const express = require('express');
const router = express.Router();
const { signup, login, makeAdmin } = require('../controller/user.controller');



router.patch('/make-admin/:userId', makeAdmin);
router.post('/signup', signup);
router.post('/login', login);



module.exports = router;
