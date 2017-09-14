const { findOne: findOneService } = require('../../../stores/service');
const { create: createReview } = require('../../../stores/service-review');

const errorOnFindService = 'Error in find service';
module.exports = async(ctx) => {
    const serviceToAddReview = findOneService({ _id: ctx.params.serviceId });

    if (!serviceToAddReview || serviceToAddReview.error) ctx.throw(404, errorOnFindService);

    const dataFromRequest = {
        userId: ctx.state.user.id,
        serviceId: ctx.params.serviceId
    };
    const reviewToCreate = Object.assign(dataFromRequest, ctx.request.body);
    const review = await createReview(reviewToCreate);

    if (review.error) ctx.throw(404, review.error.message);

    ctx.body = { success: true, review };
};
