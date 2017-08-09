const assert = require('assert');

const { create: createService } = require('../../../stores/service');
const { update: updateUser } = require('../../../stores/user');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service/like GET sohuld create a service given', async () => {
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
            await updateUser({
                email: __user.email
            },
                {
                    likes: [serviceCreated._id]
                });
            const { body: res } = await agent.get(`/service/${serviceCreated._id}/like`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.deepEqual(res, { likes: true });
        });
    });

    describe('FAIL', () => {

    });
});
