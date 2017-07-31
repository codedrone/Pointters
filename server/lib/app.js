const Koa = require('koa');
const jwt = require('koa-jwt');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const cookie = require('koa-cookie');
const errors = require('./middelwares/errors');

const { jwt: { secret } } = require('../../config');

const app = new Koa();
app.use(errors);
app.use(logger());
app.use(jwt({ secret }).unless({ path: [ '/login', '/signup' ] }));
app.use(bodyParser({
    formLimit: '5mb',
    jsonLimit: '5mb',
    textLimit: '5mb'
}));
module.exports = app;
