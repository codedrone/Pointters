const assert = require('assert');

const { create: createService } = require('../../../stores/service');
const { update: updateUser } = require('../../../stores/user');
const { get: getWatching } = require('../../../stores/user/watching');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service/watch POST sohuld create a service given', async() => {
            const service = {
                userId: require('mongoose').Types.ObjectId(),
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
            const watching = await getWatching({ _id: __user._id });
            assert.deepEqual(watching, [ serviceCreated._id ]);
        });
    });

    describe('FAIL', () => {

    });
});
