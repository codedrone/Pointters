const { remove } = require('../../../stores/service');

module.exports = async(ctx) => {
    const queryToFindService = { _id: ctx.params.idService };

    await remove(queryToFindService);

    ctx.body = { success: true };
};
