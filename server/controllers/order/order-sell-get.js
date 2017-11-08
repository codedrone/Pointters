const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/order');
const { findOne: fineOneUser } = require('../../../stores/user');
const { findOne: findService } = require('../../../stores/service');

module.exports = async (ctx) => {
    const { page, limit } = ctx.query;
    const user = { sellerId: ctx.session.id};
    const sellers = await paginate(user, { page, limit });

    if (sellers.total == 0) ctx.throw(404, 'No service found');

    if (sellers.error) ctx.throw(404, 'seller error');

    const { docs, buyerWithoutDocs } = sellers;
    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        const result = {};
        result.buyer = {};
        result.service = {};
        result.order = {};
        result.order.paymentDate = doc.paymentDate;
        result.order.orderMilestoneStatuses = doc.orderMilestoneStatuses;
        const serviceLocation = doc.buyerServiceLocation[0];
        if(doc.buyerServiceLocation == null)
            serviceLocation = doc.sellerServiceLocation[0];
        result.order.serviceLocation = serviceLocation;

        result.buyer.id = doc.buyerId;
        result.service.id = doc.serviceId;
        const buyer = await fineOneUser({ _id: doc.buyerId });
        if(buyer)
        {
            result.buyer.firstName = doc.firstName;
            result.buyer.lastName = doc.lastName;
            result.buyer.phone = doc.phone;
        }
        const service = await findService({ _id: doc.serviceId });
        if(service)
        {
            result.service.description = service.description;
            result.service.createdAt = service.createdAt;
            result.service.updatedAt = service.updatedAt;
            result.service.media = service.media[0];
        }
        console.log(service, doc.serviceId);
        return resolve(result);
    })));
    ctx.status = 200;
    ctx.body = { docs: results, buyerWithoutDocs };
};

