const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/offer');
const { findOne: fineOneUser } = require('../../../stores/user');

const errorInGetWatching = 'Error in get to request-order';
const orderDoesNotExists = 'Error in get to request-order';

module.exports = async (ctx) => {
	const { page, limit } = ctx.query;
    const user = { sellerId: ctx.session.id};
    const sents = await paginate(user, { page, limit });
	const { docs, ...buyerWithoutDocs } = sents;
    if (!sents) ctx.throw(403, orderDoesNotExists);

    if (sents.error) ctx.throw(404, errorInGetWatching);

    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        let offData = {};
        offData.userId = doc.userId;
        offData.sellerId = doc.sellerId;
        offData.serviceId = doc.serviceId;
        offData.price = doc.price;
        offData.workDuration = doc.workDuration;
        offData.workDurationUom = doc.workDurationUom;
        offData.createdAt = doc.createdAt;
        const seller = await fineOneUser({ _id: doc.sellerId });
        let sellerData = {};
        sellerData.firstName = seller.firstName;
        sellerData.lastName = seller.lastName;
        sellerData.location = seller.location;
        sellerData.phone = seller.phone;
        sellerData.profilePic = seller.profilePic;
        const result = { offerData: offData, sellerData: sellerData };
        return resolve(result);
    })));
    console.log(results);
    ctx.status = 200;
    ctx.body = { docs: results, ...buyerWithoutDocs };
};
