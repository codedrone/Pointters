const { paginate } = require('../../../stores/service');

const errorMessage = 'Error in find service';

module.exports = async(ctx) => {
    if (ctx.session) {
        let { userId, page, limit } = ctx.query;
        const { id } = ctx.session;
        if (!userId) userId = id;
        const services = await paginate({ userId }, { page, limit });
        if (!services || services.error) {
            ctx.status = 404;
            ctx.body = 'No service found';
        }
        ctx.status = 200;
        ctx.body = { services };
    } else {
        ctx.status = 401;
        ctx.body = 'No Authorization';
    }
};