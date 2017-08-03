const { findOne } = require('../../../stores/user');

module.exports = async (ctx) => {
    const userFollowing = await findOne(ctx.queryToFindUserById);
    const following = userFollowing.following.map((followId) => followId.toString());
    ctx.body = {
        following: new Set(following).has(ctx.params.followedId)
    };
};
