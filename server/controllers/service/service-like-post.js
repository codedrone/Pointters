const { push: pushToLikes } = require('../../../stores/user/likes');
const { findOne: findOneService } = require('../../../stores/service');

const errorMessage = 'Service does not exists';
module.exports = async(ctx) => {
    console.log(' ctx.params.idService', ctx.params.idService);
    const service = await findOneService({ _id: ctx.params.idService });

    if (!service || service.error) ctx.throw(400, errorMessage);

    const { error } = await pushToLikes(ctx.queryToFindUserById, ctx.params.idService);

    if (error) ctx.throw(500, error.message);

    ctx.body = { success: true };
};
