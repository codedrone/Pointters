const assert = require('assert');

const { findOne, create } = require('../../../stores/service');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service POST sohuld create a service given', async() => {
            const body = {
                userId: __user._id,
                message: 'mesage',
                media: {
                    media: 'the media is here'
                },
                tags: [ 'tags_1', 'tag_2' ]
            };
            const serviceCreated = await create(body);
            const { body: { service: res } } = await agent.get(`/service/${serviceCreated._id}`)
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
