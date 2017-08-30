const { findOne: findOneOffer } = require('../../../stores/request-offer');

const errorInGetWatching = 'Error in get to request-offer';
const offerDoesNotExists = 'Error in get to request-offer';

module.exports = async(ctx) => {
    const queryToFindOffer = { _id: ctx.params.idOffer };
    console.log('queryToFindOffer ', queryToFindOffer);
    const requestOffer = await findOneOffer(queryToFindOffer);

    if (!requestOffer) ctx.throw(403, offerDoesNotExists);

    if (requestOffer.error) ctx.throw(500, errorInGetWatching);

    ctx.body = {
        offer: requestOffer
    };
};