const assert = require('assert');

const features = require('./features');
const { findOne: findOneOffer } = require('../../../../stores/background-candidate');


describe('User requests', () => {
    describe('SUCCESS', () => {
        it('/checkr POST sohuld create a request given', (done) => {
            const body = {
                firstName: 'firstName',
                middleName: 'middleName',
                lastName: 'lastName',
                email: 'email@test.com',
                phone: '23432432432',
                zipcode: '90401',
                dob: '1970-01-22',
                ssn:'111-11-2001',
                driverLicenseNumber: 'F1112001',
                driverLicenseState: 'CA'
            };
            const emitter = features();
            console.log('antes de agregar listener');
            emitter.on('done', () => {
                delete body.bob;
                findOneOffer(body)
                    .then((candidate) => assert(candidate.isActive === true))
                    .then(() => done());
            });
            console.log('antes de llamar la api');
            agent.post('/checkr')
                .send(body)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200)
                .then(({body}) => assert(body.success));
        });
    });

    describe('FAIL', () => {

    });
});
