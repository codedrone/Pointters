const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/offer');
const { findOne: findOneUser } = require('../../../stores/user');
const {Types:{ObjectId}} = require('../../../databases/mongo');

const { findOne: findOneService } = require('../../../stores/service');

module.exports = async (ctx) => {
	const { gt_id, lt_id, sortBy, inputPage, inputLimit } = ctx.query;
    let query = { buyerId: ctx.queryToFindUserById._id };

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

    const receives = await paginate(query, { page: inputPage, limit: inputLimit, sort: sort });

    if (receives.total == 0 || receives.error)
        ctx.throw(404, "No offer found");

    const { docs, total, limit, page, pages } = receives;

		let lastDocId = null;
		if(docs && docs.length > 0) lastDocId = docs[docs.length-1]._id;

    const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
        let result = {};
        let offData = {};
				result.seller={};
        result.seller.sellerId = doc.sellerId;
				result.offerId = doc._id;
        result.serviceId = doc.serviceId;
				result.description = doc.description;
        result.price = doc.price;
        result.workDuration = doc.workDuration;
        result.workDurationUom = doc.workDurationUom;
        result.createdAt = doc.createdAt;
        if(doc.media) result.media = doc.media[0];
        if(doc.location) result.location = doc.location;

        const ServiceData = await findOneService({ _id: ObjectId(doc.serviceId) });
        if(ServiceData && !result.description)
        {
            result.description = ServiceData.description;
						if(!result.media) result.media=ServiceData.media[0];
						if(!result.location) result.location=ServiceData.location[0];
        }

				const userData = await findOneUser({ _id: ObjectId(doc.sellerId) });
        if(userData)
        {
            result.seller.firstName = userData.firstName;
            result.seller.lastName = userData.lastName;
            result.seller.location = userData.location;
            result.seller.phone = userData.phone;
            result.seller.profilePic = userData.profilePic;
						if(!result.media) result.media = {
              fileName: userData.profilePic,
              mediaType: "image"
            }
						if(!result.location) result.location=userData.location;
        }

        return resolve(result);
    })));
    ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages, lastDocId: lastDocId };

};
