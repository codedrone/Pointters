const assert = require('assert');

const { findOne: findOneOffer } = require('../../../stores/offer');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/offer POST sohuld create a request given', async() => {
            const body = {
                fulfillmentMethod: { fulfillmentMethod: 'fulfillmentMethod' },
                location: { location: 'location' },
                media: { media: 'media' },
                price: { price: 'price' },
                serviceId: 'id of service',
                workDuration: { workDuration: 'workDuration' },
                workDurationUom: 'hour'
            };

            const { body: res } = await agent
                .post('/offer')
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.deepEqual(res, { success: true });
            const offer = await findOneOffer(body);
            assert(offer.isActive === true);
        });
    });

    describe('FAIL', () => {

    });
});
