const jwt = require('koa-jwt');
const unless = require('./unless');

const { jwt: { secret }} = require('../../../config');

const middelware = jwt({ secret });

middelware.unless = unless(middelware);

module.exports = middelware;
