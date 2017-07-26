const express = require('express');
const controller = require('./user.controller');
const authservice = require('../../auth/auth.service');


const router = express.Router();

router.get('/:id', authservice.isAuthenticated(), controller.getuser);

module.exports = router;
