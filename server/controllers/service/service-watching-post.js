const { push: pushToWatching } = require('../../../stores/user/watching');
const { findOne: findOneService } = require('../../../stores/service');

const errorMessage = 'Service does not exists';
module.exports = async(ctx) => {
    console.log(' ctx.params.idService', ctx.params.idService);
    const service = await findOneService({ _id: ctx.params.idService });

    if (!service || service.error) ctx.throw(400, errorMessage);

    const { error } = await pushToWatching(ctx.queryToFindUserById, ctx.params.idService);

    if (error) ctx.throw(404, error.message);

    ctx.body = { success: true };
};
