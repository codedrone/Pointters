const assert = require('assert');

const { create } = require('../../../stores/request');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/request GET sohuld create a request given', async() => {
            const body = {
                userId: __user._id,
                category:{
                    type: 'Object'
                },
                location:{
                    type: 'Object'
                },
                media:{
                    type: 'Object'
                },
                minPrice:1,
                maxPrice:1,
                scheduleDate:1,
            };
            const requestCreated = await create(body);
            console.log('requestCreated ', requestCreated);
            const { body: { request: res } } = await agent.get(`/request/${requestCreated._id}`)
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
