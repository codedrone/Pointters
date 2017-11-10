const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/following');
const { findOne: fineOneUser } = require('../../../stores/user');
const { find: fineOneService } = require('../../../stores/service');
const {Types:{ObjectId}} = require('../../../databases/mongo');

const errorMessage = 'Error in find service';

module.exports = async(ctx) => {
    const { inputPages, inputLimit } = ctx.query;
    const user = { followTo: ObjectId(ctx.session.id)};
    const followers = await paginate(user, { inputPages, inputLimit });

    if (followers.total == 0 || followers.error) ctx.throw(404, 'No follower found');
    const { docs, total, limit, page, pages } = followers;
    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        const { followTo, followFrom, docWithoutFollowTo } = doc._doc;
        const tempFollowTo = await fineOneUser({ _id: ObjectId(followTo) });

        const servicesFollowTo = await fineOneService({ userId: ObjectId(followTo) });
        const categoriesFollowTo = map(servicesFollowTo, (serviceFollowTo) => serviceFollowTo.category);

        const tempFollowFrom = await fineOneUser({ _id: ObjectId(followFrom) });

        const servicesFollowFrom = await fineOneService({ userId: ObjectId(followFrom)});
        const categoriesFollowFrom = map(servicesFollowFrom, (serviceFollowFrom) => serviceFollowFrom.category);

        const result = { docWithoutFollowTo, followTo: tempFollowTo, servicesFollowTo: categoriesFollowTo, followFrom: tempFollowFrom, sevicesFollowFrom: categoriesFollowFrom };
        return resolve(result);
    })));

    ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages };
};
