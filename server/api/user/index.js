'use strict';

var express = require('express');
var controller = require('./user.controller');
var authservice = require('../../auth/auth.service');


var router = express.Router();


router.post('/signup', controller.usersignup);
router.post('/login', controller.userlogin);

console.log(authservice.isAuthenticated);

router.get('/:id', authservice.isAuthenticated() , controller.getuser);
 

module.exports = router;
