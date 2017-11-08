const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/offer');
const { findOne: fineOneUser } = require('../../../stores/user');
const { findOne: fineOneService } = require('../../../stores/service');

module.exports = async (ctx) => {
	const { inputPages, inputLimit } = ctx.query;
    const user = { buyerId: ctx.session.id};
    const receives = await paginate(user, { inputPages, inputLimit });

    if (receives.total == 0 || receives.error) 
        ctx.throw(404, "No receives found");

    const { docs, total, limit, page, pages } = receives;
    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        let result = {};
        let offData = {};
        result.userId = doc.userId;
        result.serviceId = doc.serviceId;
        result.price = doc.price;
        result.workDuration = doc.workDuration;
        result.workDurationUom = doc.workDurationUom;
        result.createdAt = doc.createdAt;
        const userData = await fineOneUser({ _id: doc.userId });
        if(userData)
        {
            result.firstName = userData.firstName;
            result.lastName = userData.lastName;
            result.location = userData.location;
            result.phone = userData.phone;
            result.profilePic = userData.profilePic;
        }
        const ServiceData = await fineOneUser({ _id: doc.serviceId });
        if(ServiceData)
        {
            result.serviceDescription = ServiceData.description;
        }
        return resolve(result);
    })));
    ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages };
    
};
