const assert = require('assert');

const feature = require('./features');
const {
    findOne: findOneShipment,
    delete: deleteShipment,
create: createShipment } = require('../../../../stores/shipment');


describe('User requests', () => {
    before(() => feature());
    describe('SUCCESS', () => {
        it('/shipment/:id/address POST sohuld create a request given', async() => {
            const body = {
                userId: __user._id
            };
            const shipmentCreated = await createShipment(body);
            const address = {
                street1: '417 MONTGOMERY ST',
                street2: 'FLOOR 5',
                city: 'SAN FRANCISCO',
                state: 'CA',
                zip: '94104',
                country: 'US',
                company: 'EasyPost',
                phone: '415-123-4567'
            };
            await agent.post(`/shipment/${shipmentCreated._id}/address`)
                .send(address)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const updated = await findOneShipment({_id:shipmentCreated._id});
            delete updated.address.verifications;
            console.log('updated.address ', updated.address);
            assert(updated.address.street1, address.street1);
            assert(updated.address.street2, address.street2);
            assert(updated.address.city, address.city);
            assert(updated.address.state, address.state);
            assert(updated.address.zip, address.zip);
            assert(updated.address.country, address.country);
            assert(updated.address.company, address.company);
            assert(updated.address.phone, address.phone);
        });
    });

    describe('FAIL', () => {});

    after(() => deleteShipment({}));
});
