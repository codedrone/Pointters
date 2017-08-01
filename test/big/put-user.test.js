const assert = require('assert');

const faker = require('faker');

const { findOne, remove, create: createUser } = require('../../stores/user');

describe('User services', () => {
    describe('SUCCESS', () => {
        it('/user PUT -> should create the user', async() => {
            await remove({});
            const body = {
                email: 'test@test.com',
                password: 'test'
            };
            const user = await createUser(body);
            global.user = user;
            const { body: { token }, headers: { 'set-cookie': cookie } } = await agent.post('/user/login').send(body);
            global.authorizationHeader = { Authorization: `Bearer ${token}` };
            global.Cookie = { Cookie: cookie };
            const data = {
                awards: faker.commerce.productName(),
                companyName: faker.commerce.productName(),
                description: faker.commerce.productName(),
                education: faker.commerce.productName(),
                firstName: faker.commerce.productName(),
                insurance: faker.commerce.department(),
                lastName: faker.commerce.productName(),
                license: faker.commerce.productName(),
                phone: '23423423423'
            };
            await agent
                .put('/user')
                .send(data)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const query = Object.assign({ email: 'test@test.com' }, data);
            const _user = await findOne(query);
            assert(_user);
        });
    });
});
