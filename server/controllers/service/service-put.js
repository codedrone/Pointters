const { update } = require('../../../stores/service');

module.exports = async (ctx) => {
    const queryToFindService = { _id: ctx.params.idService };
    const dataToUpdateService = ctx.request.body;
    const { error } = await update(queryToFindService, dataToUpdateService);

    if (error) ctx.throw(404, error.message);
    ctx.body = { success: true };
};
