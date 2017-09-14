const { findOne: findOneReview } = require('../../../stores/service-review');

module.exports = async(ctx) => {
    console.log(' ctx.params.reviewI', ctx.params.reviewI);
    const queryToFindReview = { _id: ctx.params.reviewId };
    const review = await findOneReview(queryToFindReview);

    if (!review || review.error) ctx.throw(404, review ? review.error.message : 'service does not exist');
    ctx.body = { success: true, review: review || {} };
};
