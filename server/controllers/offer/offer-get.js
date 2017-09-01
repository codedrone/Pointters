const { findOne: findOneOffer } = require('../../../stores/offer');

const errorInGetWatching = 'Error in get to request-offer';
const offerDoesNotExists = 'Error in get to request-offer';

module.exports = async (ctx) => {
    const queryToFindOffer = { _id: ctx.params.idOffer };
    console.log('queryToFindOffer ', queryToFindOffer);
    const offer = await findOneOffer(queryToFindOffer);

    if (!offer) ctx.throw(403, offerDoesNotExists);

    if (offer.error) ctx.throw(404, errorInGetWatching);

    ctx.body = { offer };
};
