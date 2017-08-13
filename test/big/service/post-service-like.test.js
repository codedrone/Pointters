const assert = require('assert');

const { create: createService } = require('../../../stores/service');
const { findOne: findOneUser, update: updateUser } = require('../../../stores/user');


describe('User services', () => {
    describe('SUCCESS', () => {
<<<<<<< HEAD:test/big/service/post-service-like.test.js
        it('/service/like POST sohuld create a service given', async () => {
            const service = {
                userId: 'id of user',
                category: {
                    category: 'category'
                },
                description: 'description',
=======
        it('/post/comment POST sohuld create a post given', async() => {
            const post = {
                userId: __user._id,
                message: 'mesage',
>>>>>>> test are foxed:test/big/post/post-post-comment.test.js
                media: {
                    media: 'the media is here'
                },
                tags: [ 'tags_1', 'tag_2' ]
            };
            const serviceCreated = await createService(service);
            await updateUser({
                _id: __user._id
            },
<<<<<<< HEAD:test/big/service/post-service-like.test.js
                {
                    likes: []
                });
            const { body: res } = await agent.post(`/service/${serviceCreated._id}/like`)
=======
            {
                comment: []
            });
            const { body: res } = await agent
                .post(`/post/${postCreated._id}/comment`)
                .send({ comment: 'comment' })
>>>>>>> test are foxed:test/big/post/post-post-comment.test.js
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.deepEqual(res, { success: true });
<<<<<<< HEAD:test/big/service/post-service-like.test.js
            const user = await findOneUser({ _id: __user._id });
            assert.deepEqual(user.likes, [serviceCreated._id]);
=======
>>>>>>> test are foxed:test/big/post/post-post-comment.test.js
        });
    });

    describe('FAIL', () => {

    });
});
