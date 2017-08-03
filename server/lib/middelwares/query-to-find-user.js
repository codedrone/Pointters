module.exports = () => async(ctx, next) => {
    if (ctx.state.user) ctx.queryToFindUserById = { _id: ctx.state.user.id };
    if (next) await next();
};
