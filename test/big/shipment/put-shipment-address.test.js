const assert = require('assert');

const {delete: deleteShipment, create: createShipment, findOne: findOneShipment } = require('../../../stores/shipment');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/shipment/:idShipment PUT sohuld create a request given', async() => {
            const body = {
                userId: __user._id,
                address:{
                    object:	'string',
                    mode	:'string',
                    street1	:'string',
                    street2	:'string',
                    city	:'string',
                    state	:'string',
                    zip	:'string',
                    country	:'string',
                    residential	:true,
                    carrierFacility	:'string',
                    name	:'string',
                    company	:'string',
                    phone	:'string',
                    email	:'string',
                    federalTaxId	:'string',
                    stateTaxId	:'string',
                }
            };
            const update = {
                street1	:'string 2',
            };
            const shipmentCreated = await createShipment(body);
            await agent.put(`/shipment/${shipmentCreated._id}/address`)
                .send(update)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const updated = await findOneShipment({_id:shipmentCreated._id});
            assert.equal(updated.address.street1, update.street1);
        });
    });

    describe('FAIL', () => {});

    after(() => deleteShipment({}));
});
