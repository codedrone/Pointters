const assert = require('assert');

const { findOne, create } = require('../../../stores/post');


describe('User posts', () => {
    describe('SUCCESS', () => {
        it('/post/media PUT sohuld create a post given', async() => {
            const body = {
                userId: __user._id,
                message: 'mesage',
                media: [ {
                    fileName:'filiname',
                    mediaType:'image'
                } ],
                tags: [ 'tags_1', 'tag_2' ]
            };
            const postCreated = await create(body);
            console.log('postCreated ', postCreated, postCreated.media[0]);

            const {body: {media}} = await agent.get(`/post/${postCreated._id}/media/${postCreated.media[0]._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);

            assert.equal(media[0].mediaType, body.media[0].mediaType);
            assert.equal(media[0].fileName, body.media[0].fileName);
        });
    });

    describe('FAIL', () => {

    });
});
