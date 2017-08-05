const { findOne } = require('../../../stores/service');

module.exports = async(ctx) => {
    const queryToFindService = { _id: ctx.params.idService };

    const service = await findOne(queryToFindService);

    ctx.body = { service };
};
