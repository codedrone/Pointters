const assert = require('assert');

const { findOne } = require('../../../stores/user');
const nock = require('./nock');

const id = 'super_id';
const body = {
    email: 'test_facebook@test.com',
    token: 'super_token',
    firstName: 'fakeFirstName',
    lastName: 'fakeLastName',
};
describe('User services', () => {
    before(() => {
        nock(body.token, id, `${body.firstName} ${body.LastName}`);
    });
    describe('SUCCESS', () => {
        it('/user/facebook/token POST -> user found and return the token', async () => {
            const { body: res, headers } = await agent.post('/user/facebook/token')
                .send(body)
                .expect(200);
            assert.equal(headers['x-rate-limit'], '1000');
            assert(headers['x-expires-after']);
            assert(res.success === true);
            assert(typeof res.token === 'string');
            const user = await findOne({ email: body.email });
            assert(user);
        });
    });
    describe('FAIL', () => {
        it('/user/facebook/token POST -> should a error if email is not send', async () => {
            const body = {
                token: 'test'
            };
            const { body: res, statusCode } = await agent.post('/user/facebook/token')
                .send(body)
                .expect(400);
            assert(res.message === 'email is required');
        });

        it('/user/facebook/token POST -> should a error if email is not send', async () => {
            const body = {
                email: 'the_pass_is_not_send@test.com'
            };
            const { body: res, statusCode } = await agent.post('/user/facebook/token')
                .send(body)
                .expect(400);
            assert(res.message === 'token is required');
        });
    });
});
