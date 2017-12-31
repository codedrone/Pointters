const { create: createRequest } = require('../../../stores/request');

const errorMessage = 'Request does not exists';

module.exports = async(ctx) => {
    const request = await createRequest(Object.assign(ctx.request.body, {userId: ctx.queryToFindUserById._id}));
    if (!request || request.error) ctx.throw(404, errorMessage);

    ctx.body = {
        request: request
    };
};
