const assert = require('assert');

const { findOne: findOneShipment, delete: deleteShipment } = require('../../../stores/shipment');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/shipment POST sohuld create a request given', async() => {
            const body = {};
            const { body: res } = await agent
                .post('/shipment')
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(res.success);
            assert(res.shipment._id);
            const shipment = await findOneShipment({_id:res.shipment._id});
            assert(shipment.isActive === true);
        });
    });

    describe('FAIL', () => {});

    after(() => deleteShipment({}));
});
