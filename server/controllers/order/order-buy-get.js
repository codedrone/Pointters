const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/order');
const { findOne: fineOneUser } = require('../../../stores/user');
const { find: findServices } = require('../../../stores/service');

const errorInGetWatching = 'Error in get to request-order';
const orderDoesNotExists = 'Error in get to request-order';

module.exports = async (ctx) => {
	const { page, limit } = ctx.query;
    const user = { buyerId: ctx.session.id};
    const buyers = await paginate(user, { page, limit });
	const { docs, buyerWithoutDocs } = buyers;
    if (!buyers) ctx.throw(403, orderDoesNotExists);

    if (buyers.error) ctx.throw(404, errorInGetWatching);

    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        const { sellerId, paymentDate, orderMilestoneStatuses, buyerServiceLocation, sellerServiceLocation, docWithoutOrder } = doc._doc;
        const seller = await fineOneUser({ _id: sellerId });
        const { firstName, lastName, phone, sellerWithout} = seller;
        const services = await findServices({ userId: seller._id });
        const serviceData = map(services, (service) => {
        	let serviceTemp = {};
        	serviceTemp.serviceId = service._id;
        	serviceTemp.serviceDescription = service.description;
        	serviceTemp.serviceMedia = service.media[0];
        	return serviceTemp;
        });
        const { _id, description, media, serviceWithout } = services;
        const serviceLocation = buyerServiceLocation[0];
        if(buyerServiceLocation == null)
        	serviceLocation = sellerServiceLocation[0];
        const result = { serviceData: serviceData, userFirstName: firstName, userLastname: lastName, userPhone: phone, userId: sellerId, orderPaymentDate: paymentDate, orderMilestoneStatuses: orderMilestoneStatuses, serviceLocation: serviceLocation };
        return resolve(result);
    })));
    ctx.status = 200;
    ctx.body = { docs: results, buyerWithoutDocs };
};
