const assert = require('assert');

const { create, delete: deleteRequests } = require('../../../stores/request');
const {pagination:{requests:limit}} = require('../../../config');


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
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log('res = ', res);
            assert.deepEqual(res.message, body.message);
            assert.deepEqual(res.media, body.media);
            assert.deepEqual(res.tags, body.tags);
        });

        it('/requests GET sohuld create a request given', async() => {
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
            const { body: { request: res } } = await agent.get(`/requests/${requestCreated._id}`)
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.deepEqual(res.message, body.message);
            assert.deepEqual(res.media, body.media);
            assert.deepEqual(res.tags, body.tags);
        });

        it('/requests GGET all request saved with pagination', async() => {
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
            for (let i = 0; i <= limit; i++) await create(body);

            const { body: { requests: res, next } } = await agent.get('/requests')
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);

            assert(res.length === limit);
            assert(next);

            const { body: { requests: resSecond, next:nextSecond } } = await agent.get(next)
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(resSecond.length === 1);
            assert(!nextSecond);
        });
    });

    describe('FAIL', () => {

    });

    after(() => deleteRequests({}));
});
