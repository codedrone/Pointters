const { findOne } = require('../../../stores/user');
const {filterKeysOfUserByRequester} = require('../../../stores/user/privacity');

module.exports = async(ctx) => {
    const queryToGetRequester = ctx.queryToFindUserById;
    const queryToGetOtherUser = ctx.request.body.userId ? { _id: ctx.request.body.userId } :
        ctx.queryToFindUserById;
    console.log('queryToGetRequester ', queryToGetRequester);
    console.log('queryToGetOtherUser ', queryToGetOtherUser);
    const requester = await findOne(queryToGetRequester);
    console.log('requester ', requester);

    if (!requester || requester.error) ctx.throw(404, 'No User found');

    if (!ctx.request.body.userId || ctx.request.body.userId === ctx.state.user.id) {
        ctx.body = {user:requester};
        return;
    }


    const otherUser = await findOne(queryToGetOtherUser);
    console.log('otherUser ', otherUser);

    if (!otherUser || otherUser.error) ctx.throw(404, 'No User found');

    const userFilter = filterKeysOfUserByRequester(otherUser, requester);
    ctx.body = {user:userFilter};
};
