const { findOne } = require('../../../stores/user');
const unless = require('./unless');

const middelware = async (ctx, next) => {
    const userUsingJwt = await findOne(ctx.queryToFindUserById);

    let userUsingSession = null;
    if (ctx.session.id) userUsingSession = await findOne({ _id: ctx.session.id });

    const isAuth = userUsingJwt && userUsingSession &&
        !userUsingJwt.error &&
        !userUsingSession.error &&
        userUsingSession._id === userUsingJwt._id;
    if (!isAuth) return ctx.throw(403, 'Unauthorized User');

    if (next) await next();
};

middelware.unless = unless(middelware);

module.exports = middelware;
