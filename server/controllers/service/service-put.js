const { update } = require('../../../stores/service');
const errorMessage = 'Service id not found';

module.exports = async (ctx) => {
    const queryToFindService = { _id: ctx.params.idService };
    const dataToUpdateService = ctx.request.body;
    const { error } = await update(queryToFindService, dataToUpdateService);

    if (error) ctx.throw(404, errorMessage);
    ctx.body = { success: true };
};
