const assert = require('assert');

const { create: createService, findOne: findOneService } = require('../../../stores/service');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service/share POST sohuld create a service given', async() => {
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
            console.log('serviceCreated ', serviceCreated);
            const { body: res } = await agent.post(`/service/${serviceCreated._id}/share`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log('res = ', res);
            const serviceShared = await findOneService({ userId: __user._id });
            assert.deepStrictEqual(res.service.category, serviceShared.category);
            assert.deepStrictEqual(res.service.media, serviceShared.media);
            assert.deepStrictEqual(res.service.pricing, serviceShared.pricing);
            assert.deepStrictEqual(res.service.fulfillmentMethod, serviceShared.fulfillmentMethod);
            assert(serviceShared.isActive);
        });
    });

    describe('FAIL', () => {

    });
});
