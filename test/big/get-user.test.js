const assert = require('assert');

const { create: createUser } = require('../../stores/user');


describe('User/:id services', () => {
    describe('SUCCESS', () => {
        it('/user/:id GET -> should return user', async () => {
            const body = {
                email: 'test_get@test.com',
                password: 'test'
            };
            const user = await createUser(body);
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent.post('/user/login').send(body);
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const { body: res } = await agent.get(`/user/${user._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.equal(res.email, user.email);
            assert.equal(res.password, user.password);
        });
    });

    describe('FAIL', () => {
        it('/user/:id GET -> should return 403 state id not councided', async () => {
            const { body: res } = await agent.get('/user/isNotTheIdInTokenSigned')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(403);
            assert(res.message === 'Unauthorized User');
        });
    });
});
