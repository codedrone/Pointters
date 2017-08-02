const assert = require('assert');

const { create: createUser } = require('../../stores/user');


describe('User/:id services', () => {
    describe('SUCCESS', () => {
        it('/user GET -> should return user', async() => {
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
            const { body: res } = await agent.get('/user')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.equal(res.email, user.email);
            assert.equal(res.password, user.password);
        });
    });
});
