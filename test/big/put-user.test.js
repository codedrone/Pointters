const assert = require('assert');

const faker = require('faker');

const { findOne } = require('../../stores/user');

describe('User services', () => {
    describe('SUCCESS', () => {
        it('/user POST -> should create the user', async() => {
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
                .expect(200);
            const query = Object.assign({ email: 'test@test.com' }, data);
            const user = await findOne(query);
            assert(user);
        });
    });
});
