const assert = require('assert');

const faker = require('faker');

const { create: createUser } = require('../../stores/user');

describe('signup services', () => {
    describe('SUCCESS', () => {
        it('/signup POST -> user found and return the token', async() => {
            const body = {
                email: 'test2@test.com',
                password: 'test'
            };
            const { body: res } = await agent.post('/signup')
                .send(body)
                .expect(200);
            assert(res.success === true);
            assert(typeof res.token === 'string');
        });
    });
    describe('FAIL', () => {
        it('/signup POST -> should a error if email is not send', async() => {
            const body = {
                password: 'test'
            };
            const { body: res, statusCode } = await agent.post('/signup')
                .send(body)
                .expect(400);
            console.log('error', statusCode, res);
            assert(res.message === 'email is required');
        });

        it('/signup POST -> should a error if email is not send', async() => {
            const body = {
                email: 'the_pass_is_not_send@test.com'
            };
            const { body: res, statusCode } = await agent.post('/signup')
                .send(body)
                .expect(400);
            console.log('error', statusCode, res);
            assert(res.message === 'password is required');
        });
    });
});
