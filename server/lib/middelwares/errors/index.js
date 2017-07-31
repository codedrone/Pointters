const debug = require('../../../../lib/debug');

const { error: { stackTraceLimit } } = require('../../../../config');


module.exports = async function(ctx, next) {
    Error.stackTraceLimit = stackTraceLimit;
    try {
        await next();
    } catch (err) {
        console.error('Error catched: ', err);
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message
        };
    }
};
