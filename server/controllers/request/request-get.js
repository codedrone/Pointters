const { findOne: findOneRequest } = require('../../../stores/request');

const errorMessage = 'Request does not exists';

module.exports = async(ctx) => {
    console.log('ctx.params.idRequest', ctx.params.idRequest);
    const request = await findOneRequest({ _id: ctx.params.idRequest });

    if (!request || request.error) ctx.throw(400, errorMessage);
    console.log('request   ', request);
    ctx.body = {
        request: request
    };
};
