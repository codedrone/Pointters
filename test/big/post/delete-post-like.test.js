const assert = require('assert');

const { create: createPost } = require('../../../stores/post');
const { findOne: findOneUser, update: updateUser } = require('../../../stores/user');


describe('User posts', () => {
    describe('SUCCESS', () => {
        it('/post/like DELETE sohuld create a post given', async () => {
            const post = {
                userId: __user._id,
                message: 'mesage',
                media: {
                    media: 'the media is here'
                },
                tags: [ 'tags_1', 'tag_2' ]
            };

            const postCreated = await createPost(post);
            console.log('postCreated ', postCreated);
            await updateUser({ _id: __user._id }, {likesPost: [ postCreated._id ]});
            const user1 = await findOneUser({ _id: __user._id });
            console.log('user =  ', user1);

            const { body: res } = await agent.delete(`/post/${postCreated._id}/like`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.deepEqual(res, { success: true });
            const user = await findOneUser({ _id: __user._id });
            console.log('user =  ', user);

            assert.deepEqual(user.likesPost, []);
        });
    });
});
