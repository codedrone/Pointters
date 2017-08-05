const assert = require('assert');

const { findOne, create: createUser } = require('../../../stores/user');

describe('Reset the password using temporal password', () => {
    describe('SUCCESS', () => {
        it('/user/reset/password POST -> should reset the password', async() => {
            const body = {
                email: 'test_reset_pass@test.com',
                password: 'test_rest',
                tempPassword: 'test_temp',
                resetPasswordExpires: new Date(Date.now() + 10000)
            };
            await createUser(body);
            const data = {
                email: body.email,
                oldPassword: body.tempPassword,
                newPassword: 'new_password'
            };
            await agent
                .post('/user/reset/password')
                .send(data)
                .expect(200);
            const query = { email: body.email, password: data.newPassword };
            const _user = await findOne(query);
            assert(_user);
        });
    });
});
