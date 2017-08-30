const { remove } = require('../../../stores/service');

const errorMessage = 'Service id not found';

module.exports = async(ctx) => {
    const queryToFindService = { _id: ctx.params.idService };

    const { error } = await remove(queryToFindService);

    if (error) ctx.throw(404, errorMessage);

    ctx.body = { success: true };
};
