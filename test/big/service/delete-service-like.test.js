const assert = require('assert');

const { create: createService } = require('../../../stores/service');
const { update: updateUser, findOne: findOneUser } = require('../../../stores/user');
const { get: getLikes } = require('../../../stores/user/likes');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service/like DELETE sohuld create a service given', async () => {
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
                _id: __user._id
            }, {
                    likes: [serviceCreated._id]
                });
            const { body: res } = await agent.delete(`/service/${serviceCreated._id}/like`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.deepEqual(res, { success: true });
            const likes = await getLikes({ _id: __user._id });
            assert.deepEqual(likes, []);
        });
    });

    describe('FAIL', () => {

    });
});
