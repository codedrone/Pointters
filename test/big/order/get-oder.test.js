const assert = require('assert');

const { create: createOrder } = require('../../../stores/order');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/request/order GET sohuld create a request given', async() => {
            const orderCreated = await createOrder({

            });
            console.log('orderCreated = ', orderCreated);
            const { body: res } = await agent
                .get(`/order/${orderCreated._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            console.log('res =====', res);
            assert(typeof res.order === 'object');
        });
    });

    describe('FAIL', () => {

    });
});
