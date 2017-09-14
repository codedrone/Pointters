const { create: createOffer } = require('../../../stores/request-offer');
const { findOne: findOneRequest } = require('../../../stores/request');

const errorMessage = 'Request does not exists';
module.exports = async(ctx) => {
    console.log(' ctx.params.idRequest', ctx.params.idRequest);
    const request = await findOneRequest({ _id: ctx.params.idRequest });

    if (!request || request.error) ctx.throw(404, errorMessage);

    const offerToCreate = Object.assign({
        userId: ctx.state.user.id,
        requestId: ctx.params.idRequest
    },
    ctx.request.body
    );
    const { error } = await createOffer(offerToCreate);

    if (error) ctx.throw(404, error.message);

    ctx.body = { success: true };
};
