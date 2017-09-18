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
    jwt: { secret, expiresIn:maxAge },
    timeout: { apiTimeout, timeoutOptions },
    pathUnprotected
} = require('../../config');
app.keys = [ secret ];

app.use(logger());
app.use(errors());
app.use(async(ctx, next) =>{
    console.log('url 1===   ', ctx.url);
    await next()
})
app.use(timeout(apiTimeout, timeoutOptions));
app.use(async(ctx, next) =>{
    console.log('url 2 ===   ', ctx.url);
    await next()
})
app.use(cookie.unless(pathUnprotected));
app.use(async(ctx, next) =>{
    console.log('url 3===   ', ctx.url);
    await next()
})
app.use(session({maxAge}, app));
app.use(async(ctx, next) =>{
    console.log('url 4===   ', ctx.url);
    await next()
})
app.use(jwt.unless(pathUnprotected));
app.use(async(ctx, next) =>{
    console.log('url 5===   ', ctx.url);
    await next()
})
app.use(getQueries.unless(pathUnprotected));
app.use(async(ctx, next) =>{
    console.log('url 6===   ', ctx.url);
    await next()
})
app.use(auth.unless(pathUnprotected));
app.use(async(ctx, next) =>{
    console.log('url 7===   ', ctx.url);
    await next()
})
app.use(bodyParser({
    formLimit: '5mb',
    jsonLimit: '5mb',
    textLimit: '5mb'
}));
app.use(async(ctx, next) =>{
    console.log('url ===   ', ctx.url);
    await next()
})
module.exports = app;
