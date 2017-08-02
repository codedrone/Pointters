const { update, findOne } = require('../../../stores/user');
const debug = require('../../../lib/debug');
module.exports = async(ctx) => {
    const data = ctx.request.body;
    data.createdAt = new Date().toString();
    const queryToUpdateUserById = {
        _id: ctx.state.user.id
    };
    await update(queryToUpdateUserById, data);
    const userUpdated = await findOne(queryToUpdateUserById);
    debug.api.info('user update : ', userUpdated);
    ctx.status = 200;
    ctx.body = { success: true };
};
