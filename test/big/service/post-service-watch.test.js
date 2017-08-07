const assert = require('assert');

const { create: createService } = require('../../../stores/service');
const { findOne: findOneUser, update: updateUser } = require('../../../stores/user');


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
            await updateUser({
                email: __user.email
            },
            {
                watching: []
            });
            const { body: res } = await agent
                .post(`/service/${serviceCreated._id}/watch`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.deepEqual(res, { success: true });
            const user = await findOneUser({ _id: __user._id });
            assert.deepEqual(user.watching, [ serviceCreated._id ]);
        });
    });

    describe('FAIL', () => {

    });
});
