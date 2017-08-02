const supertest = require('supertest');

const { create: createUser, remove } = require('../stores/user');
const app = require('../server');


before(async() => {
    global.agent = supertest(app);
    const body = {
        email: 'test@test.com',
        password: 'test'
    };
    const user = await createUser(body);
    global.__user = user;
    const { body: { token }, headers: { 'set-cookie': cookie } } = await agent.post('/user/login').send(body);
    global.authorizationHeader = { Authorization: `Bearer ${token}` };
    global.Cookie = { Cookie: cookie };
    console.log('globally = ', Cookie, authorizationHeader);
});

after(async() => {
    await remove({});
});
