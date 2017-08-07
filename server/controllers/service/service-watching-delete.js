const { pull: pullToWatching } = require('../../../stores/user/watching');
const { findOne: findOneService } = require('../../../stores/service');

const errorMessage = 'Service does not exists';
module.exports = async(ctx) => {
    console.log('ctx.params.idService ', ctx.params.idService);
    const service = await findOneService({ _id: ctx.params.idService });

    if (!service) ctx.throw(400, errorMessage);

    const res = await pullToWatching(ctx.queryToFindUserById, ctx.params.idService);

    console.log('error = ', res);
    if (res.error) ctx.throw(500, 'Error on delete watching');
    ctx.body = { success: true };
};
