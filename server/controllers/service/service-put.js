const { update } = require('../../../stores/service');

module.exports = async(ctx) => {
    const queryToFindService = { _id: ctx.params.idService };
    const dataToUpdateService = ctx.request.body;
    await update(queryToFindService, dataToUpdateService);

    ctx.body = { success: true };
};
