const config = require('../config')(); // get db config file
const jwt = require('jsonwebtoken');

module.exports = (id, email) => jwt.sign({_id: id, email: email}, config.secret);
