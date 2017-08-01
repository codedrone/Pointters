const assert = require('assert');


describe('login services', () => {
    describe('SUCCESS', () => {
        it('/:id GET -> should return user', async() => {
            const { body: res } = await agent.get(`/${user._id}`)
                .set(authorizationHeader)
                .expect(200);
            assert.equal(res.email, user.email);
            assert.equal(res.password, user.password);
        });
    });
});
