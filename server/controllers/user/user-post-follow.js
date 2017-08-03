const { findOne, update } = require('../../../stores/user');
const isValidId = require('../../lib/is-valid-id');
const userNoValidMessage = 'User to follow no valid';
const idInvalidMessage = 'Id is not Valid';
module.exports = async(ctx) => {
    const validId = await isValidId(ctx.params.followedId);

    if (!validId) return ctx.throw(400, idInvalidMessage);

    const userToFollow = await findOne({ _id: ctx.params.followedId });

    if (!userToFollow) return ctx.throw(400, userNoValidMessage);

    const user = await findOne(ctx.queryToFindUserById);
    user.following.push(userToFollow._id);
    await update(ctx.queryToFindUserById, { following: user.following });
    ctx.body = { success: true };
};
