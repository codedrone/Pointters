const assert = require('assert');

const { findOne } = require('../../../stores/service');


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
            const { body: res } = await agent.post('/service')
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);

            assert(res.success === true);
            assert(typeof res.service === 'object');
            const serviceCreated = await findOne({});
            console.log('serviceCreated ', serviceCreated);
            assert.deepEqual(serviceCreated.category, body.category);
            assert.deepEqual(serviceCreated.description, body.description);
            assert.deepEqual(serviceCreated.pricing, body.pricing);
            assert.deepEqual(serviceCreated.fulfillmentMethod, body.fulfillmentMethod);
        });
    });

    describe('FAIL', () => {

    });
});
