const debug = require('../../../../lib/debug');

const { error: { stackTraceLimit } } = require('../../../../config');


module.exports = () => async(ctx, next) => {
    Error.stackTraceLimit = stackTraceLimit;
    try {
        await next();
        console.log('session in error ', ctx.session, ctx.headers);
    } catch (err) {
        console.error('Error catched: ', err);
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message
        };
    }
};
