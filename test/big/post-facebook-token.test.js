const assert = require('assert');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/user/facebook/token POST -> user found and return the token', async() => {
            const body = {
                email: 'test2@test.com',
                token: 'the_super_facebook_token'
            };
            const { body: res, headers } = await agent.post('/user/facebook/token')
                .send(body)
                .expect(200);
            assert.equal(headers['x-rate-limit'], '1000');
            assert(headers['x-expires-after']);
            assert(res.success === true);
            assert(typeof res.token === 'string');
        });
    });
    describe('FAIL', () => {
        it('/user/facebook/token POST -> should a error if email is not send', async() => {
            const body = {
                token: 'test'
            };
            const { body: res, statusCode } = await agent.post('/user/facebook/token')
                .send(body)
                .expect(400);
            console.log('error', statusCode, res);
            assert(res.message === 'email is required');
        });

        it('/user/facebook/token POST -> should a error if email is not send', async() => {
            const body = {
                email: 'the_pass_is_not_send@test.com'
            };
            const { body: res, statusCode } = await agent.post('/user/facebook/token')
                .send(body)
                .expect(400);
            console.log('error', statusCode, res);
            assert(res.message === 'token is required');
        });
    });
});
