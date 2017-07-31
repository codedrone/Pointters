const assert = require('assert');

const faker = require('faker');

const { create: createUser } = require('../../stores/user');

describe('login services', () => {
    describe('SUCCESS', () => {
        it('/login POST -> user not found', async() => {
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            const { body: res } = await agent.post('/login')
                .send(body)
                .expect(200);
            assert(res.success === false);
            assert(res.msg === 'Authentication failed. User not found.');
        });

        it('/login POST -> user found and return the token', async() => {
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            await createUser(body);
            const { body: res } = await agent.post('/login')
                .send(body)
                .expect(200);
            assert(res.success === true);
            assert(typeof res.token === 'string');
        });
    });
});
