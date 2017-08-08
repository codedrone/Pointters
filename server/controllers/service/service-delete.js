const { remove } = require('../../../stores/service');

const errorMessage = 'Error on remove service';

module.exports = async(ctx) => {
    const queryToFindService = { _id: ctx.params.idService };

    const { error } = await remove(queryToFindService);

    if (error) ctx.throw(500, errorMessage);

    ctx.body = { success: true };
};
