module.exports = (id, ctx, next) => (async() => {
    console.log('In validate id = ', ctx.state.user, ctx.session);

    if (id !== ctx.state.user.id) return ctx.throw(403, 'Unauthorized User');

    await next();
})();
