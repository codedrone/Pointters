const Promise = require('bluebird');
const { map } = require('lodash');
const { get } = require('../../../stores/user/likes');
const { findOne: findOneService } = require('../../../stores/service');
const { findOne: findOneUser } = require('../../../stores/user');

const errorMessage = 'Service does not exists';
const errorInGetWatching = 'Error in get to watching';

module.exports = async(ctx) => {
    const likes = await get(ctx.queryToFindUserById);
    if (likes.error) ctx.throw(404, errorInGetWatching);
    const results = await Promise.all(map(likes, (like) => new Promise(async (resolve) => {
    	let result = {};
    	result.service = {};
	    result.user = {};
	    result.service.id = like;
    	const service = await findOneService({ _id: like });
    	if (service)
    	{
    		console.log(service);
    		const user = await findOneUser({ _id: service.userId });
	        result.service.description = service.description;
	        result.service.media = service.media[0];
	        result.service.location = service.location;
	        result.service.prices = service.prices[0];
	        if(user)
	        {
	        	result.user.id = user._id;
		        result.user.firstName = user.firstName;
		        result.user.lastName = user.lastName;
		        result.user.profilePic = user.profilePic;
	        }
    	}
        return resolve(result);
    })));

    ctx.status = 200;
    ctx.body = { results };
};