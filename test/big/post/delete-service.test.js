const assert = require('assert');

const { findOne, create } = require('../../../stores/service');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service POST sohuld create a service given', async() => {
            const body = {
                isActive: true,
                userId: __user._id,
                message: 'mesage',
                media: {
                    media: 'the media is here'
                },
                tags: [ 'tags_1', 'tag_2' ]
            };
            const serviceCreated = await create(body);
            await agent.delete(`/service/${serviceCreated._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const deleted = await findOne({ _id: postCreated._id });
            console.log('deleted ', deleted);
            assert(!deleted.isActive);
        });
    });

    describe('FAIL', () => {

    });
});
