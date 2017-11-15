const Promise = require('bluebird');
const { map } = require('lodash');
const { Types: { ObjectId } } = require('../../../databases/mongo');
const { paginate } = require('../../../stores/request');
const { findOne, count: countRequestOffer } = require('../../../stores/request-offer');

module.exports = async(ctx) => {
	const { lt_id, inputPage, inputLimit } = ctx.query;
	let query = { userId: ctx.session.id };
	if (lt_id) query._id = { $lt: ObjectId(lt_id) };
	const requests = await paginate(query, { page: inputPage, limit: inputLimit });
	if (requests.total == 0 || requests.error) ctx.throw(404, "Error in find request");
	const { docs, total, limit, page, pages } = requests;
	const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
		let result = {};
		result.requests = {};
		result.requests.id = doc._id;
		result.requests.description = doc.description;
		result.requests.createdAt = doc.createdAt;
		result.requests.media = doc.media;
		result.requests.numOffers  = await countRequestOffer({ requestId: doc._id });
		result.requests.low = doc.minPrice;
		result.requests.high = doc.maxPrice;
		return resolve(result);
	})));
	ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages };
};