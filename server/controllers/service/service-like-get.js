const { push: pushToLikes } = require('../../../stores/user/likes');
const { findOne: findOneService } = require('../../../stores/user');

const errorMessage = 'Service does not exists';
const errorInPushToLikes = 'Error in push to likes';

module.exports = async(ctx) => {
    const service = await findOneService({ _id: ctx.params.idService });

    if (!service) ctx.throw(400, errorMessage);

    const { error } = await pushToLikes(ctx.queryToFindUserById, ctx.params.idService);

    if (error) ctx.throw(500, errorInPushToLikes);

    ctx.body = { success: true };
};
