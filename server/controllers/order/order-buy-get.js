const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/order');
const { findOne: fineOneUser } = require('../../../stores/user');
const { findOne: findService } = require('../../../stores/service');

module.exports = async (ctx) => {
	const { inputPages, inputLimit } = ctx.query;
    const user = { buyerId: ObjectId(ctx.session.id) };
    const buyers = await paginate(user, { inputPages, inputLimit });

    if (buyers.total == 0) ctx.throw(404, "No buyer found");

    if (buyers.error) ctx.throw(404, 'buyer error');

    const { docs, total, limit, page, pages } = buyers;
    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        const result = {};
        result.seller = {};
        result.service = {};
        result.order = {};
        result.order.paymentDate = doc.paymentDate;
        result.order.orderMilestoneStatuses = doc.orderMilestoneStatuses;
        const serviceLocation = doc.buyerServiceLocation[0];
        if(doc.buyerServiceLocation == null)
            serviceLocation = doc.sellerServiceLocation[0];
        result.order.serviceLocation = serviceLocation;

        result.seller.id = doc.sellerId;
        result.service.id = doc.serviceId;
        const seller = await fineOneUser({ _id: ObjectId(doc.sellerId) });
        if(seller)
        {
            result.seller.firstName = doc.firstName;
            result.seller.lastName = doc.lastName;
            result.seller.phone = doc.phone;
        }
        const service = await findService({ _id: ObjectId(doc.serviceId) });
        if(service)
        {
            result.service.description = service.description;
            result.service.createdAt = service.createdAt;
            result.service.updatedAt = service.updatedAt;
            result.service.media = service.media[0];
        }
        return resolve(result);
    })));
    ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages };
};
