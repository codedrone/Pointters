const Promise = require('bluebird');
const { map } = require('lodash');
const { paginate } = require('../../../stores/like');
const { findOne: findOneService } = require('../../../stores/service');
const { findOne: findOneUser } = require('../../../stores/user');

const errorInGetWatching = 'Error in get to watching';

module.exports = async(ctx) => {
    const { inputPages, inputLimit } = ctx.query;
    const user = { userId: ObjectId(ctx.session.id) };

    const likes = = await paginate(user, { inputPages, inputLimit });

    if (likes.total || likes.error) ctx.throw(404, errorInGetWatching);

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
        const user = await findOneUser({ _id: ObjectId(service.userId) });
        if(user)
        {
	        result.user.firstName = user.firstName;
	        result.user.lastName = user.lastName;
	        result.user.profilePic = user.profilePic;
        }
        return resolve(result);
    })));

    ctx.status = 200;
    ctx.body = { docs: results, total: total, limit: limit, page: page, pages: pages };