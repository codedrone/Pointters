const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/offer');
const { findOne: fineOneUser } = require('../../../stores/user');

module.exports = async (ctx) => {
	const { page, limit } = ctx.query;
    const user = { buyerId: ctx.session.id};
    const receives = await paginate(user, { page, limit });

    if (receives.total == 0 || receives.error) 
        ctx.throw(404, "No receives found");

    const { docs, buyerWithoutDocs } = receives;
    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        let offData = {};
        offData.userId = doc.userId;
        offData.buyerId = doc.buyerId;
        offData.serviceId = doc.serviceId;
        offData.price = doc.price;
        offData.workDuration = doc.workDuration;
        offData.workDurationUom = doc.workDurationUom;
        offData.createdAt = doc.createdAt;
        const buyer = await fineOneUser({ _id: doc.buyerId });
        let buyerData = {};
        buyerData.firstName = buyer.firstName;
        buyerData.lastName = buyer.lastName;
        buyerData.location = buyer.location;
        buyerData.phone = buyer.phone;
        buyerData.profilePic = buyer.profilePic;
        const result = { offerData: offData, buyerData: buyerData };
        return resolve(result);
    })));
    ctx.status = 200;
    ctx.body = { docs: results, ...buyerWithoutDocs };
    
};
