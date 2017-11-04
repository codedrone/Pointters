const { findOne } = require('../../../stores/service');

const errorMessage = 'Error in find service';

module.exports = async(ctx) => {
	if(ctx.session)
	{
	    const queryToFindService = { _id: ctx.params.id };
	    const service = await findOne(queryToFindService);

	    if (!service || service.error) {
	    	ctx.status = 404;
	    	ctx.body = 'No service found';
	    } else {
		    ctx.status = 200;
		    ctx.body = { service };
		}
	} else {
		ctx.status = 401;
	    ctx.body = 'No Authorization';
	}
};