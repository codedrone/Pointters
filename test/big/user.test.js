const assert = require('assert');

const faker = require('faker');


describe('user services', () => {
    describe('SUCCESS', () => {
        it('/login POST -> user not found', function *() {
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const {body: res} = yield agent.post('/login')
                .send(body)
                .expect(200);
            assert(res.success === false);
            assert(res.msg === 'Authentication failed. User not found.');
        });
    });
});
