const jwt = require('koa-jwt');
const unless = require('./unless');

const { jwt: { secret, expiresIn}} = require('../../../config');

const middelware = jwt({ secret, expiresIn});

middelware.unless = unless(middelware);

module.exports = middelware;
