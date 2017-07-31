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
    global.user = user;
    const { body: { token } } = await agent.post('/login').send(body);
    global.authorizationHeader = { Authorization: `Bearer ${token}` };
});

after(async() => {
    await remove({});
});
