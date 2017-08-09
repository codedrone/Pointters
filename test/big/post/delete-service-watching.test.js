const assert = require('assert');

const { create: createService } = require('../../../stores/service');
const { update: updateUser, findOne: findOneUser } = require('../../../stores/user');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service/watch DELETE sohuld create a service given', async () => {
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
            await updateUser({
                email: __user.email
            }, {
                    watching: [serviceCreated._id]
                });
            const { body: res } = await agent
                .delete(`/service/${serviceCreated._id}/watch`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.deepEqual(res, { success: true });
            const user = await findOneUser({ _id: __user._id });
            assert.deepEqual(user.watching, []);
        });
    });

    describe('FAIL', () => {

    });
});
