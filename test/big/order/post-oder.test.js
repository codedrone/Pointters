const assert = require('assert');

const { findOne: findOneOrder } = require('../../../stores/order');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/order POST sohuld create a request given', async() => {
            const body = {
                
            };

            const { body: res } = await agent
                .post('/order')
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.deepEqual(res, { success: true });
            const order = await findOneOrder(body);
            assert(order.isActive === true);
        });
    });

    describe('FAIL', () => {

    });
});
