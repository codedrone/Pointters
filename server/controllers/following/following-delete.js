const { delete: deleteFollowing, findOne } = require('../../../stores/following');

module.exports = async(ctx) => {
    const queryToFindService = { _id: ctx.params.idfollowing };

    await deleteFollowing(queryToFindService);
    const following = await findOne(queryToFindService);
    if (following)
    	ctx.body = { success: false };
    else
    	ctx.body = { success: true };
};
