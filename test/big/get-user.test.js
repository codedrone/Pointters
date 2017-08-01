const assert = require('assert');


describe('User/:id services', () => {
    describe('SUCCESS', () => {
        it('/user/:id GET -> should return user', async () => {
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
            console.log('res = ', res);
            assert(res.message === 'Unauthorized User');
        });
    });
});
