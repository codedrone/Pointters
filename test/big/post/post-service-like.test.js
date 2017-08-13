const assert = require('assert');

const { create: createService } = require('../../../stores/service');
const { findOne: findOneUser, update: updateUser } = require('../../../stores/user');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service/like POST sohuld create a service given', async () => {
            const service = {
                userId: 'id of user',
                category: {
                    category: 'category'
                },
                description: 'description',
                media: {
                    media: 'the media is here'
                },
                tags: ['tags_1', 'tag_2']
            };
            const serviceCreated = await createService(service);
            await updateUser({
                email: __user.email
            },
                {
                    likes: []
                });
            const { body: res } = await agent.post(`/service/${serviceCreated._id}/like`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.deepEqual(res, { success: true });
            const user = await findOneUser({ _id: __user._id });
            assert.deepEqual(user.likes, [serviceCreated._id]);
        });
    });

    describe('FAIL', () => {

    });
});
