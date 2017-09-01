const createCandidateAsync = require('./create-candidate-async');


module.exports = async(ctx) => {
    createCandidateAsync(ctx.request.body, ctx.state);
    ctx.body = { success: true };
};
