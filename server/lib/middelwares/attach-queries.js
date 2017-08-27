const unless = require('./unless');

const attachQuery = async(ctx, next) => {
    console.log('ctx.state.user in attach ', ctx.state.user);
    if (ctx.state.user) ctx.queryToFindUserById = { _id: ctx.state.user.id };
    if (next) await next();
};

attachQuery.unless = unless(attachQuery);

module.exports = attachQuery;
