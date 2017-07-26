
const express = require('express');
const controller = require('./user.controller');
const router = express.Router();

router.post('/login', controller.userlogin);

module.exports = router;
