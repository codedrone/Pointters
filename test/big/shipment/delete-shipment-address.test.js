const assert = require('assert');

const {delete: deleteShipment, create: createShipment, findOne} = require('../../../stores/shipment');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/shipment/:idShipment/address DELETE sohuld create a request given', async() => {
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
            const shipmentCreated = await createShipment(body);
            await agent.delete(`/shipment/${shipmentCreated._id}/address`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const removed = await findOne({_id: shipmentCreated._id});
            console.log('removed ', removed);
            assert.deepStrictEqual(removed.address, { verifications: [] });
        });
    });

    describe('FAIL', () => {});

    after(() => deleteShipment({}));
});
