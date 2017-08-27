const { findOne } = require('../../../stores/user');
const { filterKeysOfUserByRequester } = require('../../../stores/user/privacity');

module.exports = async(ctx) => {
    const queryToGetRequester = ctx.queryToFindUserById;
    const queryToGetOtherUser = ctx.request.body.userId ? { _id: ctx.request.body.userId } :
        ctx.queryToFindUserById;
    const requester = await findOne(queryToGetRequester);
    if (!requester || requester.error) ctx.throw(404, 'No User found');

    if (!ctx.request.body.userId || ctx.request.body.userId === ctx.state.user.id) {
        delete requester.password;
        ctx.body = { user: requester };
        return;
    }


    const otherUser = await findOne(queryToGetOtherUser);

    if (!otherUser || otherUser.error) ctx.throw(404, 'No User found');

    const userFilter = filterKeysOfUserByRequester(otherUser, requester);
    ctx.body = { user: userFilter };
};
