const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/service');
const { find: findOrder } = require('../../../stores/order');
const { find: findReview } = require('../../../stores/service-review');

const errorMessage = 'Error in find service';

module.exports = async(ctx) => {
    let { userId, inputPages, inputLimit } = ctx.query;
    const { id } = ctx.session;
    if (!userId) userId = id;
    const services = await paginate({ userId }, { inputPages, inputLimit });

    if (services.total == 0 || services.error) {
        ctx.throw(404, 'No service found');
    }

    const { docs, total, limit, page, pages } = services;
    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        let result = {};
        result.service = {};
        result.service.id = doc.serviceId;
        result.service.description = doc.description;
        result.service.location = doc.fulfillmentMethod;
        result.service.media = doc.media[0];
        result.service.location = doc.location;
        result.service.prices = doc.prices[0];
        result.service.promoted = doc.promoted;
        result.numOrders = 0;
        result.avgRating = 0;
        result.ratingCount = 0;
        result.pointValue = 1;
        const orders = await findOrder({ serviceId: doc.serviceId });

        if(orders)
        {
            const tempOrders = map(orders, (order) => {
                if(order.orderMilestoneStatuses.completed)
                {
                    result.numOrders ++;
                }
                return order.orderMilestoneStatuses.completed;
            });
        }
        const reviews = await findReview({ serviceId: doc.serviceId });
        if(reviews)
        {
            const tempOrders = map(reviews, (review) => {
                result.avgRating += review.overallRating;
                result.ratingCount ++;
                return review.overallRating;
            });
        }
        result.avgRating /= result.ratingCount;
        return resolve(result);
    })));

    ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages };
};
