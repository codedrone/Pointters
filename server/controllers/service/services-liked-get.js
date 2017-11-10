const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/like');
const { findOne: findOneService } = require('../../../stores/service');
const { findOne: findOneUser } = require('../../../stores/user');
const { find: findOrder } = require('../../../stores/order');
const { find: findReview } = require('../../../stores/service-review');

const errorInGetWatching = 'like does not exists';

module.exports = async(ctx) => {
    const { inputPages, inputLimit } = ctx.query;
    const user = { userId: ctx.session.id };

    const likes = await paginate(user, { inputPages, inputLimit });

    if (likes.total == 0 || likes.error) ctx.throw(404, errorInGetWatching);

    const { docs, total, limit, page, pages } = likes;
    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
    	let result = {};
    	result.service = {};
	    result.user = {};
	    result.service.id = doc.serviceId;
    	const service = await findOneService({ _id: doc.serviceId });
    	if (service)
    	{
	        result.service.description = service.description;
	        result.service.media = service.media[0];
	        result.service.location = service.location;
	        result.service.prices = service.prices[0];
        }
        result.user.id = doc.userId;
        const user = await findOneUser({ _id: doc.userId });
        if(user)
        {
	        result.user.firstName = user.firstName;
	        result.user.lastName = user.lastName;
	        result.user.profilePic = user.profilePic;
        }
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
}