const assert = require('assert');

const { create: createService } = require('../../../stores/service');
const { findOne: findOneReview } = require('../../../stores/service-review');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service/watch POST sohuld create a service given', async() => {
            const service = {
                userId: 'id of user',
                category: {
                    category: 'category'
                },
                description: 'description',
                media: {
                    media: 'media'
                },
                pricing: {
                    pricing: 'pricing'
                },
                fulfillmentMethod: {
                    fulfillmentMethod: 'fulfillmentMethod'
                },
            };
            const serviceCreated = await createService(service);
            const review = {
                comment: 'comments to test review',
                qualityOfService: 4,
                overallRating: 80,
                willingToBuyServiceAgain: false
            };
            const { body: res } = await agent
                .post(`/service/${serviceCreated._id}/review`)
                .send(review)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(res.success);
            assert(res.review);
            const reviewCreated = await findOneReview({
                serviceId: serviceCreated._id
            });
            assert(reviewCreated);
        });
    });

    describe('FAIL', () => {

    });
});
