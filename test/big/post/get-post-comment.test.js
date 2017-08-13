const assert = require('assert');

const { create: createPost } = require('../../../stores/post');
const { update: updateUser } = require('../../../stores/user');
const { create: createComment } = require('../../../stores/post-comment');


describe('User posts', () => {
    describe('SUCCESS', () => {
        it('/post/comment GET sohuld create a post given', async () => {
            const post = {
                userId: __user._id,
                message: 'mesage',
                media: {
                    media: 'the media is here'
                },
                tags: ['tags_1', 'tag_2'],

            };
            const postCreated = await createPost(post);
            const commentCreated = await createComment({
                comment: 'comment',
                postId: postCreated._id,
                userId: __user._id

            });
            await updateUser({
                _id: __user._id
            },
                {
                    comment: [postCreated._id]
                });
            console.log('commentCreated = ', commentCreated);
            const { body: res } = await agent
                .get(`/post/${postCreated._id}/comment/${commentCreated._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log('res = ', res);
            assert(typeof res.comment === 'object');
        });
    });

    describe('FAIL', () => {

    });
});
