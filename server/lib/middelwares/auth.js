const unless = require('koa-unless');

const { findOne } = require('../../../stores/user');

const middelware = async(ctx, next) => {
    console.log('In auth = ', ctx.state.user, ctx.session);
    const userUsingJwt = await findOne({
        _id: ctx.state.user.id,
        email: ctx.state.user.email
    });

    const userUsingSession = await findOne({
        _id: ctx.session.id,
        email: ctx.session.email
    });

    const isAuth = userUsingJwt && userUsingSession;
    if (!isAuth) return ctx.throw(403, 'Unauthorized User');

    await next();
};

middelware.unless = unless;

module.exports = middelware;
