const Promise = require('bluebird');
const { map } = require('lodash');
const { get } = require('../../../stores/user/watching');
const { findOne: findOneService } = require('../../../stores/service');
const { findOne: findOneUser } = require('../../../stores/user');

const errorMessage = 'Service does not exists';
const errorInGetWatching = 'Error in get to watching';

module.exports = async(ctx) => {
    const watchs = await get(ctx.queryToFindUserById);
    if (watchs.error) ctx.throw(404, errorInGetWatching);
    const results = await Promise.all(map(watchs, (watch) => new Promise(async (resolve) => {
    	let result = {};
    	result.service = {};
    	result.service.id = watch;
	    result.user = {};
    	const service = await findOneService({ _id: watch });
    	if (service)
    	{
    		const user = await findOneUser({ _id: service.userId });
	        result.service.id = service._id;
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