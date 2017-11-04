const { find } = require('../../../stores/service');

const errorMessage = 'Error in find service';

module.exports = async(ctx) => {
    let { userId } = ctx.query;
    const { id } = ctx.session;
    if (!userId) userId = id;
    const services = await find({ userId });
    if (!services || services.error) {
    	ctx.status = 404;
    	ctx.body = 'No service found';
    }
    ctx.status = 200;
    ctx.body = { services };
};
