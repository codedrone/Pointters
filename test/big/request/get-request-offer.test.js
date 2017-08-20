const assert = require('assert');

const { create: createRequest } = require('../../../stores/request');
const { create: createOffer } = require('../../../stores/request-offer');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/request/offer GET sohuld create a request given', async () => {
            const request = {
                userId: __user._id,
                category:{
                    type: Object
                },
                location:{
                    type: Object
                },
                media:{
                    type: Object
                },
                minPrice:1,
                maxPrice:1,
                scheduleDate:1

            };
            const requestCreated = await createRequest(request);
            console.log('requestCreated ', requestCreated);
            const offerCreated = await createOffer({
                category:{
                    type: Object
                },
                location:{
                    type: Object
                },
                media:{
                    type: Object
                },
                minPrice:0,
                maxPrice:1,
                scheduleDate:1,
                requestId: requestCreated._id,
                userId: __user._id

            });
            console.log('offerCreated = ', offerCreated);
            const { body: res } = await agent
                .get(`/request/${offerCreated._id}/offer`)
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
