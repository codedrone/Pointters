const { findOne } = require('../../../stores/user');

module.exports = async(ctx) => {
    const queryToGetUser = ctx.request.body.userId ?
        { _id: ctx.request.body.userId } :
        ctx.queryToFindUserById;
    console.log('queryToGetUser ', queryToGetUser);
    const user = await findOne(queryToGetUser);
    if (!user || user.error) {
        ctx.status = 404;
        ctx.body = 'No User found';
        return;
    }

    ctx.status = 200;
    ctx.body = user;
};
