const assert = require('assert');

const {delete: deleteShipment, create: createShipment} = require('../../../stores/shipment');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/shipment/:idShipment GET sohuld create a request given', async() => {
            const body = {
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
                },
                userId: __user._id
            };
            const shipmentCreated = await createShipment(body);
            const {body:{address}} = await agent.get(`/shipment/${shipmentCreated._id}/address`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            delete address.verifications;
            assert.deepStrictEqual(address, body.address);
        });
    });

    describe('FAIL', () => {});

    after(() => deleteShipment({}));
});
