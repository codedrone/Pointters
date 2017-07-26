const express = require('express');

const {getuser} = require('../../controllers/user');
const {isAuthenticated} = require('../../lib/middelwares/auth');
const schema = require('./params-schema');
const validate = require('../../lib/middelwares/validate-params');

const router = express.Router();

router.get('/:id', validate(schema), isAuthenticated(), getuser);

module.exports = router;
