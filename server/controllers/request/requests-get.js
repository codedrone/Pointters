const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/request');
const { findOne, count: countRequestOffer } = require('../../../stores/request-offer');

module.exports = async(ctx) => {
	const user = {userId: ctx.session.id}
	const requests = await paginate(user);
	if (requests.total == 0 || requests.error) ctx.throw(404, "Error in find request-offer");
	const { docs, total, limit, page, pages } = requests;
	const results = await Promise.all(map(docs, (doc) => new Promise(async (resolve) => {
		let result = {};
		result.requests = {};
		result.requests.id = doc._id;
		result.requests.description = doc.description;
		result.requests.createdAt = doc.createdAt;
		result.requests.media = doc.media[0];
		result.requests.numOffers  = await countRequestOffer({ requestId: doc._id });;
		result.requests.low = doc.min;
		result.requests.high = doc.max;
		return resolve(result);
	})));
	ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages };
};