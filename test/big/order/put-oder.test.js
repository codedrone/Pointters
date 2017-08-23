const assert = require('assert');

const { create: createOrder, findOne: findOneOrder } = require('../../../stores/order');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/order/:idOrder PUT sohuld create a request given', async() => {
            const order = {
               
            };
            const orderCreated = await createOrder(order);
            console.log('orderCreated ', orderCreated);
            const update = {
                price: {
                    amount: 0
                }
            };
            await agent.put(`/order/${orderCreated._id}`)
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const updated = await findOneOrder({ _id: orderCreated._id });
            console.log('update ', updated);
            assert.deepEqual(updated.price, update.price);
        });
    });

    describe('FAIL', () => {

    });
});
