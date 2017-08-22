const { remove: removeOffer } = require('../../../stores/offer');

const errorMessage = 'Request does not exists';
module.exports = async(ctx) => {
    console.log('ctx.params.idOffer in delete', ctx.params.idOffer);
    const requestRemoved = await removeOffer({ _id: ctx.params.idOffer });
    console.log('requestRemoved', requestRemoved);
    if (!requestRemoved || requestRemoved.error) ctx.throw(400, errorMessage);

    ctx.body = { success: Boolean(requestRemoved.ok) };
};
