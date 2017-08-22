const assert = require('assert');

const { create: createOffer } = require('../../../stores/offer');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/request/offer GET sohuld create a request given', async() => {
            const offerCreated = await createOffer({
                category: {
                    type: 'Object'
                },
                location: {
                    type: 'Object'
                },
                media: {
                    type: 'Object'
                },
                minPrice: 0,
                maxPrice: 1,
                scheduleDate: 1,
                serviceId: 'id of service',
                userId: __user._id

            });
            console.log('offerCreated = ', offerCreated);
            const { body: res } = await agent
                .get(`/offer/${offerCreated._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log('res =====', res);
            assert(typeof res.offer === 'object');
        });
    });

    describe('FAIL', () => {

    });
});
