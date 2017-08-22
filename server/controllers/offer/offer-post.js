const { create: createOffer } = require('../../../stores/offer');

module.exports = async(ctx) => {
    const offerToCreate = Object.assign({
        userId: ctx.state.user.id,
    },
    ctx.request.body
    );
    const { error } = await createOffer(offerToCreate);

    if (error) ctx.throw(500, error.message);

    ctx.body = { success: true };
};
