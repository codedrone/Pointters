const { update } = require('../../../stores/user');

module.exports = async(ctx) => {
    const userId = ctx.state.user.id;
    const settings = ctx.request.body;
    await update({ _id: userId }, { settings });
    ctx.status = 200;
    ctx.body = { success: true };
};
