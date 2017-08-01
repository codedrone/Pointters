const { findOne } = require('../../../stores/user');

module.exports = async (ctx) => {
    const userId = ctx.params.id;
    const user = await findOne({ _id: userId });
    if (!user) {
        ctx.status = 404;
        ctx.body = 'No User found';
        return;
    }

    ctx.status = 200;
    ctx.body = user;
};
