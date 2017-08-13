const assert = require('assert');

const { findOne, create } = require('../../../stores/service');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service POST sohuld create a service given', async () => {
            const body = {
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
            const serviceCreated = await create(body);
            console.log('serviceCreated : ', serviceCreated);
            await agent.delete(`/service/${serviceCreated._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const deleted = await findOne({ _id: serviceCreated._id });
            console.log('deleted ', deleted);
            assert(!deleted.isActive);
        });
    });

    describe('FAIL', () => {

    });
});
