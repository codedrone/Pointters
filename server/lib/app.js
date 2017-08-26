const Koa = require('koa');
const jwt = require('./middelwares/jwt');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const auth = require('./middelwares/auth');
const errors = require('./middelwares/errors');
const session = require('koa-session');
const cookie = require('./middelwares/cookie');
const getQueries = require('./middelwares/attach-queries');
const timeout = require('koa-timeout-v2');

const app = new Koa();
const {
    jwt: { secret, expiresIn },
    timeout: { apiTimeout, timeoutOptions },
    pathUnprotected
} = require('../../config');
app.keys = [ secret ];

app.use(errors());
app.use(logger());
app.use(timeout(apiTimeout, timeoutOptions));
app.use(cookie.unless({
    path: pathUnprotected
}));
app.use(session({
    maxAge: expiresIn,
}, app));
app.use(jwt.unless({
    path: pathUnprotected
}));
app.use(auth.unless({
    path: pathUnprotected
}));
app.use(bodyParser({
    formLimit: '5mb',
    jsonLimit: '5mb',
    textLimit: '5mb'
}));
app.use(getQueries());
module.exports = app;
