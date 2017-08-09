const assert = require('assert');

const { create: createPost } = require('../../../stores/post');
const { update: updateUser } = require('../../../stores/user');


describe('User posts', () => {
    describe('SUCCESS', () => {
        it('/post/comment GET sohuld create a post given', async() => {
            const post = {
                userId: __user._id,
                message: 'mesage',
                media: {
                    media: 'the media is here'
                },
<<<<<<< HEAD
                tags: [ 'tags_1', 'tag_2' ],
=======
                tags: [ 'tags_1', 'tag_2' ]
>>>>>>> the test for post comment is not fixed

            };
            const postCreated = await createPost(post);
            await updateUser({
                email: __user.email
            },
            {
                comment: [ postCreated._id ]
            });
            const { body: res } = await agent
                .get(`/post/${postCreated._id}/comment`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log('res = ', res);
            assert.deepEqual(res, { comment: true });
        });
    });

    describe('FAIL', () => {

    });
});
