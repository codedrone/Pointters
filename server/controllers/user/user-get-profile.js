const { findOne: findOneUser } = require('../../../stores/user');
const { findOne: findOneFollowing } = require('../../../stores/following');
const { avgOnTime, count: countOrder  } = require('../../../stores/order');
const { count: numLikes  } = require('../../../stores/like');
const { count: numWatching  } = require('../../../stores/watch');
const { avgQuality  } = require('../../../stores/service-review');
const errorMessage = 'Error in find user';

module.exports = async(ctx) => {
    let { userId } = ctx.query;
    if (!userId) {
        const { id } = ctx.session;
        userId = id;
    }
    const user = await findOneUser({ _id: userId });
    if (!user || user.error) ctx.throw(404, errorMessage);
    let result = {};
    result.id = user.awards;
    result.companyName = user.companyName;
    result.description = user.description;
    result.education = user.education;
    result.firstName = user.firstName;
    result.lastName = user.lastName;
    result.insurance = user.insurance;
    result.license = user.license;
    if(userId) {
        if(user.locationViewPermission == 'public')
            result.location = user.location;
        if(user.phoneViewPermission == 'public')
            result.phone = user.phone;
        const follow = await findOneFollowing({ followFrom: userId });
        if(follow) {
            const followTo = await findOneUser({ _id: followTo });
            if(followTo) {
                if(user.locationViewPermission == 'followers') {
                    result.location = followTo.location;
                }
                if(user.phoneViewPermission == 'followers')
                    result.phone = followTo.phone;
            }
        }
        

    } else {
        result.location = user.location;
        result.phone = user.phone;
    }
    result.serviceMetrics = {};
    result.serviceMetrics.avgOnTime = await avgOnTime({ sellerId: userId });
    result.serviceMetrics.avgQuality  = await avgQuality ({ sellerId: userId });
    result.serviceMetrics.avgResponseTime = 1;
    result.serviceMetrics.numOrdersCompleted = await countOrder({ sellerId: userId });
    result.serviceDetails = {};
    result.serviceDetails.pointValue = 1;
    result.serviceDetails.numLikes = await numLikes({ sellerId: userId });;
    result.serviceDetails.numWatching  = await numWatching({ sellerId: userId });;
    ctx.status = 200;
    ctx.body = { result };
};