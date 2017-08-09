const assert = require('assert');

const { findOne } = require('../../../stores/service');


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
            const { body: res } = await agent.post('/service')
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);

            assert(res.success === true);
            assert(typeof res.service === 'object');
            const serviceCreated = await findOne({});
            console.log('serviceCreated ', serviceCreated);
            assert.deepEqual(serviceCreated.category, body.category);
            assert.deepEqual(serviceCreated.description, body.description);
            assert.deepEqual(serviceCreated.pricing, body.pricing);
            assert.deepEqual(serviceCreated.fulfillmentMethod, body.fulfillmentMethod);
        });
    });

    describe('FAIL', () => {

    });
});
