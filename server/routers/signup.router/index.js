const express = require('express');

const {usersignup} = require('../../controllers/user');
const validate = require('../../lib/middelwares/validate-body');
const schema = require('./body-schema');

const router = express.Router();
router.post('/signup', validate(schema), usersignup);

module.exports = router;
