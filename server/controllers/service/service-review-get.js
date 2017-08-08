const { findOne: findOneReview } = require('../../../stores/service-review');

module.exports = async(ctx) => {
    console.log(' ctx.params.reviewI', ctx.params.reviewI);
    const queryToFindReview = { _id: ctx.params.reviewId };
    const review = await findOneReview(queryToFindReview);

    if (review.error) ctx.throw(500, review.error.message);
    console.log('review ======== ', review);
    ctx.body = { success: true, review };
};
