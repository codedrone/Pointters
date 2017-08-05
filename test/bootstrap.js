const supertest = require('supertest');

const { create: createUser, remove: removeUser } = require('../stores/user');
const { remove: removeService } = require('../stores/user');
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
});

after(async() => {
    await removeUser({});
    await removeService({});
});
