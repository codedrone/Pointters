const Koa = require('koa');
const jwt = require('koa-jwt');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const auth = require('./middelwares/auth');
const errors = require('./middelwares/errors');
const session = require('koa-session');
const cookie = require('koa-cookie');
const getQueries = require('./middelwares/attach-queries');


const app = new Koa();
const { jwt: { secret, expiresIn } } = require('../../config');
app.keys = [ secret ];
const pathProtected = [
    '/user/login',
    '/user/signup',
    '/user/facebook/token',
    '/user/opt',
    '/user/reset/password'
];

app.use(errors());
app.use(logger());
app.use(cookie.default());
app.use(session({
    maxAge: expiresIn,
}, app));
app.use(jwt({ secret })
    .unless({
        path: pathProtected
    }));
app.use(auth
    .unless({
        path: pathProtected
    }));
app.use(bodyParser({
    formLimit: '5mb',
    jsonLimit: '5mb',
    textLimit: '5mb'
}));
app.use(getQueries());
module.exports = app;
