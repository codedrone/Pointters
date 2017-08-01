const assert = require('assert');

const faker = require('faker');

const { create: createUser } = require('../../stores/user');

describe('login services', () => {
    describe('SUCCESS', () => {
        it('/user/login POST -> user not found', async() => {
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const { body: res } = await agent.post('/user/login')
                .send(body)
                .expect(200);

            assert(res.success === false);
            assert(res.msg === 'Authentication failed. User not found.');
        });

        it('/user/login POST -> user found and return the token', async() => {
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            await createUser(body);
            const { body: res, headers } = await agent.post('/user/login')
                .send(body)
                .expect(200);
            console.log('headers', headers);
            assert.equal(headers['x-rate-limit'], '1000');
            assert(headers['x-expires-after']);
            assert(res.success === true);
            assert(typeof res.token === 'string');
        });
    });
});
