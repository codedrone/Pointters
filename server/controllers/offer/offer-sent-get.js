const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/offer');
const { findOne: findOneUser } = require('../../../stores/user');
const {Types:{ObjectId}} = require('../../../databases/mongo');

const { findOne: findOneService } = require('../../../stores/service');

module.exports = async (ctx) => {
    const { gt_id, lt_id, sortBy, inputPage, inputLimit } = ctx.query;
    let query = { sellerId: ctx.queryToFindUserById._id };

    let sort = { _id: -1 };
    if (sortBy === '-1') sort._id = -1;
    else if (sortBy === '1') sort._id = 1;

    if (lt_id) {
        query._id = { $lt: ObjectId(lt_id) };
        sort = { _id: -1 };
    }
    if (gt_id) {
        query._id = { $gt: ObjectId(gt_id) };
        sort = { _id: 1 };
    }
    const sellers = await paginate(query, { page: inputPage, limit: inputLimit, sort:sort });
    if (sellers.total == 0 || sellers.error)
        ctx.throw(404, "No offer found");
    const { docs, total, limit, page, pages } = sellers;

    let lastDocId = null;
    if(docs && docs.length > 0) lastDocId = docs[docs.length-1]._id;

    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        let result = {};
        let offData = {};
        result.buyer={};
        result.buyer.buyerId = doc.buyerId;
        result.serviceId = doc.serviceId;
        result.description = doc.description;
        result.price = doc.price;
        result.workDuration = doc.workDuration;
        result.workDurationUom = doc.workDurationUom;
        result.createdAt = doc.createdAt;
        const userData = await findOneUser({ _id: ObjectId(doc.buyerId) });
        if(userData)
        {
            result.buyer.firstName = userData.firstName;
            result.buyer.lastName = userData.lastName;
            result.buyer.location = userData.location;
            result.buyer.phone = userData.phone;
            result.buyer.profilePic = userData.profilePic;
        }
        const ServiceData = await findOneService({ _id: ObjectId(doc.serviceId) });
        if(ServiceData && !result.description)
        {
            result.description = ServiceData.description;
        }
        return resolve(result);
    })));
    ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages, lastDocId: lastDocId };

};
