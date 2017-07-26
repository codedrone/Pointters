const express = require('express');
const {usersignup} = require('../../controllers/user');


const router = express.Router();
router.post('/signup', usersignup);

module.exports = router;
