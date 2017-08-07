const { push: pushToWatching } = require('../../../stores/user/watching');
const { findOne: findOneService } = require('../../../stores/service');

const errorMessage = 'Service does not exists';
module.exports = async(ctx) => {
    console.log(' ctx.params.idService', ctx.params.idService);
    const service = await findOneService({ _id: ctx.params.idService });

    if (!service) ctx.throw(400, errorMessage);

    await pushToWatching(ctx.queryToFindUserById, ctx.params.idService);
    ctx.body = { success: true };
};
