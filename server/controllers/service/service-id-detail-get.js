const Promise = require('bluebird');
const { map } = require('lodash');
const { findOne: findOneService } = require('../../../stores/service');
const { findOne: findOneUser } = require('../../../stores/user');
const { find: findOrder } = require('../../../stores/order');
const { find: findReview } = require('../../../stores/service-review');

const errorMessage = 'Error in find service';

module.exports = async(ctx) => {
    const queryToFindService = ( { _id: ctx.params.idService })
    const service = await findOneService(queryToFindService);
    let result = {};
    result.seller = {};
    result.service = {};

    if (!service || service.error) ctx.throw(404, errorMessage);

    result.service.id = service._id;
    result.service.description = service.description;
    result.service.fulfillmentMethod = service.fulfillmentMethod;
    result.service.location = service.location;
    result.service.media = service.media;
    result.service.prices = service.prices;
    result.service.promoted = service.promoted;
    const user = await findOneUser({ _id: service.userId });
    if(user)
    {
        result.seller.companyName = user.companyName;
        result.seller.firstName = user.firstName;
        result.seller.lastName = user.lastName;
        result.seller.phone = user.phone;
        result.seller.profilePic = user.profilePic;
        result.seller.userId = user._id;
        result.seller.verified = user.verified;
    }
    const orders = await findOrder({ serviceId: service._id });

    result.pointValue = 1;
    result.numOrders = 0;
    result.ratingCount = 0;
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
    reviews = await findReview({ serviceId: service._id });
    result.avgRating = 0;
    if(reviews)
    {
        const tempOrders = map(reviews, (review) => {
            result.avgRating += review.overallRating;
            result.ratingCount ++;
            return review.overallRating;
        });
    }
    result.avgRating /= result.ratingCount;
    result.avgResponseTime = 1;
    ctx.status = 200;
    ctx.body = { result };
};