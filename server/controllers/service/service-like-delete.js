const { pull: pullToLikes } = require('../../../stores/user/likes');
const { findOne: findOneService } = require('../../../stores/service');

const errorMessage = 'Service does not exists';
module.exports = async (ctx) => {
    const service = await findOneService({ _id: ctx.params.idService });

    if (!service) ctx.throw(400, errorMessage);

    await pullToLikes(ctx.queryToFindUserById, ctx.params.idService);
    ctx.body = { success: true };
};
