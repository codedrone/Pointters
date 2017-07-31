const { jwt: { expiresIn, secret } } = require('../../config'); // get db config file
const jwt = require('jsonwebtoken');

module.exports = (params) => jwt.sign(params, secret, { expiresIn });
