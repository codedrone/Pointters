const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/following');
const { findOne: fineOneUser } = require('../../../stores/user');
const { find: fineOneService } = require('../../../stores/service');

const errorMessage = 'Error in find service';

module.exports = async(ctx) => {
    if (ctx.session) {
        const { page, limit } = ctx.query;
        const user = { followTo: ctx.session.id};
        const followers = await paginate(user, { page, limit });
        
        if (followers.total == 0 || followers.error) {
            ctx.throw(404, 'No follower found');
        }else{
            const { docs, followersWithoutDocs } = followers;
            const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
                const { followTo, followFrom, docWithoutFollowTo } = doc._doc;
                const tempFollowTo = await fineOneUser({ _id: followTo });

                const servicesFollowTo = await fineOneService({ userId: followTo });
                const categoriesFollowTo = map(servicesFollowTo, (serviceFollowTo) => serviceFollowTo.category);

                const tempFollowFrom = await fineOneUser({ _id: followFrom });

                const servicesFollowFrom = await fineOneService({ userId: followFrom});
                const categoriesFollowFrom = map(servicesFollowFrom, (serviceFollowFrom) => serviceFollowFrom.category);

                const result = { docWithoutFollowTo, followTo: tempFollowTo, servicesFollowTo: categoriesFollowTo, followFrom: tempFollowFrom, sevicesFollowFrom: categoriesFollowFrom };
                return resolve(result);
            })));

            ctx.status = 200;
            ctx.body = { followersWithoutDocs, docs: results };
        }
    } else {
        ctx.status = 401;
        ctx.body = 'No Authorization';
    }
};
