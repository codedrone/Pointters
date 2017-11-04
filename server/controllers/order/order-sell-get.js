const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/order');
const { findOne: fineOneUser } = require('../../../stores/user');
const { find: findServices } = require('../../../stores/service');

const errorInGetWatching = 'Error in get to request-order';
const orderDoesNotExists = 'Error in get to request-order';

module.exports = async (ctx) => {
	const { page, limit } = ctx.query;
    const user = { sellerId: ctx.session.id };
    const seller = await paginate(user, { page, limit });
	const { docs, ...sellerWithoutDocs } = seller;
    if (!seller) ctx.throw(403, orderDoesNotExists);

    if (seller.error) ctx.throw(404, errorInGetWatching);

    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        const { buyerId, paymentDate, orderMilestoneStatuses, buyerServiceLocation, sellerServiceLocation, ...docWithoutOrder } = doc._doc;
        const buyer = await fineOneUser({ _id: buyerId });
        const { firstName, lastName, phone, ...sellerWithout} = buyer;
        const services = await findServices({ userId: buyer._id });
        const serviceData = map(services, (service) => {
        	let serviceTemp = {};
        	serviceTemp.serviceId = service._id;
        	serviceTemp.serviceDescription = service.description;
        	serviceTemp.serviceMedia = service.media[0];
        	return serviceTemp;
        });
        const { _id, description, media, ...serviceWithout } = services;
        const serviceLocation = sellerServiceLocation[0];
        if(sellerServiceLocation == null)
        	serviceLocation = buyerServiceLocation[0];
        const result = { serviceData: serviceData, userFirstName: firstName, userLastname: lastName, userPhone: phone, userId: buyerId, orderPaymentDate: paymentDate, orderMilestoneStatuses: orderMilestoneStatuses, serviceLocation: serviceLocation };
        return resolve(result);
    })));
    ctx.status = 200;
    ctx.body = { docs: results, ...sellerWithoutDocs };
};
