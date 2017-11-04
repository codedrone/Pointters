const assert = require('assert');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/services GET -> should return user services', async() => {
            const body = {
                email: 'test_get_settings@test.com',
                password: 'test',
                userId: require('mongoose').Types.ObjectId()
            };
            const {
                body: { token },
                headers: { 'set-cookie': cookie }
            } = await agent.post('/user/login').send({
                email: body.email,
                password: body.password
            });
            const authorizationHeader = { Authorization: `Bearer ${token}` };
            const Cookie = { Cookie: cookie };
            const { body: res } = await agent.get(`/services`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert(res.success === true);
            assert(typeof res.services === 'array');
        });
    });
    describe('FAIL', () => {
        it('/services GET sohuld create a service given', async () => {
            await agent.get('/services')
                .set(authorizationHeader)
                .set(Cookie)
                .expect(404);
        });
    });
    describe('FAIL', () => {
        it('/services GET -> return error if pass is wrong', async() => {
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            await createUser(body);
            body.password = faker.internet.password();
            const { body: res } = await agent.post('/user/login')
                .send(body)
                .expect(401);
            assert(res.message === 'Authentication failed.');
        });
    });
});