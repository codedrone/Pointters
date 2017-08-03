const { findOne, update } = require('../../../stores/user');
const checkIFIsValidId = require('../../lib/is-valid-id');
const userNoValidMessage = 'User to follow no valid';
const idInvalidMessage = 'Id is not Valid';

module.exports = async(ctx) => {
    const isValidId = await checkIFIsValidId(ctx.params.followedId);
    if (!isValidId) return ctx.throw(400, idInvalidMessage);

    const userToUnfollow = await findOne({ _id: ctx.params.followedId });

    if (!userToUnfollow) return ctx.throw(400, userNoValidMessage);

    ctx.body = { success: true };
    const user = await findOne(ctx.queryToFindUserById);
    const following = user.following;
    const setOfFollowing = new Set(following);
    if (!setOfFollowing.has(userToUnfollow._id)) return;

    setOfFollowing.delete(userToUnfollow._id);
    user.following = Array.from(setOfFollowing);
    await update(ctx.queryToFindUserById, { following: user.following });
};
