const express = require('express');
const {getuser} = require('../../controllers/user');
const authservice = require('../../services/auth.service');


const router = express.Router();

router.get('/:id', authservice.isAuthenticated(), getuser);

module.exports = router;
