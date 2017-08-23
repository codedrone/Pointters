const assert = require('assert');

const { create: createdOrder, findOne: findOnedOrder } = require('../../../stores/order');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/order/:iddOrder DELETE sohuld create a request given', async () => {
            const order = {
                userId: __user._id,
                serviceId: 'id of service',
                isActive: true,
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
                scheduleDate: 1
            };
            const orderCreated = await createdOrder(order);
            console.log('order ====: ', orderCreated);
            await agent.delete(`/order/${orderCreated._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const orderNotActive = findOnedOrder({ _id: orderCreated._id });
            assert(!orderNotActive.isActive);
        });
    });

    describe('FAIL', () => {

    });
});
