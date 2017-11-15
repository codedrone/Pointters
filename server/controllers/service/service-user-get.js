const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/service');
const { numOrders } = require('../../../stores/order');
const { avgRating } = require('../../../stores/service-review');
const { Types: { ObjectId } } = require('../../../databases/mongo');

const errorMessage = 'Error in find service';

module.exports = async(ctx) => {

    const { gt_id, lt_id, inputPage, inputLimit } = ctx.query;
    let { userId } = ctx.query;
    if (!userId) {
        const { id } = ctx.session;
        userId = id;
    }
    let services = {};
    if (lt_id) {
        services = await paginate({ userId, _id: { $lt: ObjectId(lt_id) } }, { page: inputPage, limit: inputLimit, sort:{ _id: 1 } });
    } else if (gt_id) {
        services = await paginate({ userId, _id: { $gt: ObjectId(gt_id) } }, { page: inputPage, limit: inputLimit, sort:{ _id: -1 } });
    } else {
        services = await paginate({ userId }, { page: inputPage, limit: inputLimit, sort:{ _id: -1 } });
    }
    if (services.total == 0 || services.error) {
        ctx.throw(404, 'No service found');
    }

    const { docs, total, limit, page, pages } = services;
    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        let result = {};
        result.service = {};
        result.service.id = doc._id;
        result.service.description = doc.description;
        result.service.location = doc.fulfillmentMethod;
        result.service.media = doc.media[0];
        result.service.location = doc.location;
        result.service.prices = doc.prices[0];
        result.service.promoted = doc.promoted;
        result.pointValue = 1;
        result.numOrders = await numOrders({ serviceId: doc._id });
        result.avgRating = await avgRating({ serviceId: doc._id });
        return resolve(result);
    })));

    ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages };
};
