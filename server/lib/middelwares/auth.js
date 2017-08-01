const { findOne } = require('../../../stores/user');
const unless = require('koa-unless');
const middelware = async (ctx, next) => {
    const user = await findOne({ _id: ctx.state.user.id });

    if (!user || user.email !== ctx.state.user.email) return ctx.throw(403, 'Unauthorized User');

    await next();
};

middelware.unless = unless;

module.exports = middelware;
