const assert = require('assert');


describe('login services', () => {
    describe('SUCCESS', () => {
        it('/:id GET -> user not found', async() => {
            const res = await agent.get(`/${user._id}`)
                .set(authorizationHeader)
                .expect(200);
            console.log('res', res);
        });
    });
});
