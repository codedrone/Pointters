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
            const update = {
                media: {
                    media: 'the media is here updated'
                }
            };
            await agent.put(`/service/${serviceCreated._id}`)
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const updated = await findOne({ _id: serviceCreated._id });
            assert.deepEqual(updated.category, update.category);
        });
    });

    describe('FAIL', () => {

    });
});
