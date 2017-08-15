const assert = require('assert');

const { findOne } = require('../../../stores/post');


describe('User posts', () => {
    describe('SUCCESS', () => {
        it('/post POST sohuld create a post given', async() => {
            const body = {
                message: 'mesage',
                media: {
                    media: 'the media is here'
                },
                tags: [ 'tags_1', 'tag_2' ]
            };
            const { body: res } = await agent.post('/post')
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log('res = ', res);
            assert(body.message, res.post.message);
            assert(body.media, res.post.media);
            assert.deepEqual(body.tags, res.post.tags);
        });
    });

    describe('FAIL', () => {

    });
});
