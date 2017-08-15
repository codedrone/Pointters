const { pull: pullToLikes } = require('../../../stores/user/likes');

const errorMessage = 'Service does not exists';
module.exports = async(ctx) => {
    console.log('ctx.params.idService ', ctx.params.idService);
    const res = await pullToLikes(ctx.queryToFindUserById, ctx.params.idService);
    console.log('res = ', res);
    if (res.error) ctx.throw(400, error.message);

    ctx.body = { success: true };
};
