const express = require('express');

const {userlogin} = require('../../controllers/user');
const validate = require('../../lib/middelwares/validate-body');
const schema = require('./body-schema');
const router = express.Router();

router.post('/login', validate(schema), userlogin);

module.exports = router;
