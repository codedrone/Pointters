
const express = require('express');
const {userlogin} = require('../../controllers/user');
const router = express.Router();

router.post('/login', userlogin);

module.exports = router;
