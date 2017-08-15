const assert = require('assert');

const { create } = require('../../../stores/post');


describe('User posts', () => {
    describe('SUCCESS', () => {
        it('/post GET sohuld create a post given', async() => {
            const body = {
                userId: __user._id,
                message: 'mesage',
                media: {
                    media: 'the media is here'
                },
                tags: [ 'tags_1', 'tag_2' ]
            };
            const postCreated = await create(body);
            const { body: { post: res } } = await agent.get(`/post/${postCreated._id}`)
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log('res = ', res);
            assert.deepEqual(res.message, body.message);
            assert.deepEqual(res.media, body.media);
            assert.deepEqual(res.tags, body.tags);
        });
    });

    describe('FAIL', () => {

    });
});
