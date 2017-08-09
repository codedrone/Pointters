const assert = require('assert');

const { findOne, create } = require('../../../stores/service');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service POST sohuld create a service given', async() => {
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
            const { body: { service: res } } = await agent.get(`/service/${serviceCreated._id}`)
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.deepEqual(res.category, body.category);
            assert.deepEqual(res.description, body.description);
            assert.deepEqual(res.pricing, body.pricing);
            assert.deepEqual(res.fulfillmentMethod, body.fulfillmentMethod);
        });
    });

    describe('FAIL', () => {

    });
});
