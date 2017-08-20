const { remove: removeRequest } = require('../../../stores/request');

const errorMessage = 'Request does not exists';
module.exports = async(ctx) => {
    console.log('ctx.params.idRequest ', ctx.params.idRequest);
    const requestRemoved = await removeRequest({ _id: ctx.params.idRequest });
    console.log('requestRemoved ', requestRemoved);
    if (!requestRemoved || requestRemoved.error) ctx.throw(400, errorMessage);

    ctx.body = { success: Boolean(requestRemoved.ok) };
};
