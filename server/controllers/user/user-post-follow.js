const { findOne } = require('../../../stores/user');
const { push } = require('../../../stores/user/following');
const isValidId = require('../../lib/is-valid-id');
const userNotValidMessage = 'User to follow no valid';
const idInvalidMessage = 'Id is not Valid';
module.exports = async(ctx) => {
    const validId = await isValidId(ctx.params.followedId);

    if (!validId) return ctx.throw(404, idInvalidMessage);

    const userToAddFollowing = ctx.queryToFindUserById;
    const userToFollow = await findOne({ _id: ctx.params.followedId });

    if (!userToFollow) return ctx.throw(404, userNotValidMessage);

    const { error } = await push(userToAddFollowing, userToFollow._id);

    if (error) ctx.throw(404, error.message);

    ctx.body = { success: true };
};
