const assert = require('assert');
const faker = require('faker');
const features = require('./features');
const { findOne, create: createUser, comparePassword} = require('../../../../stores/user');
const {
    emailSenderingCong:{
        emailRemitentInOpt,
        subjectOptEmail: subject,
        contentOptEmail: content
    }
} = require('../../../../config');

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
            const query = { email: body.email };
            const _user = await findOne(query);
            const match = await comparePassword(data.newPassword, _user.password);
            assert(!match.error);
        });

        it('/user/reset/password POST -> should reset the password with complete flow', async() => {
            const body = {
                email: faker.internet.email(),
                password: faker.internet.password()
            };
            features(emailRemitentInOpt, body.email, subject, content);
            await createUser(body);
            const {body: resOtp} = await agent
                .post('/user/otp')
                .send({email: body.email});
            const data = {
                email: body.email,
                oldPassword: resOtp.tempPassword,
                newPassword: 'new_password'
            };
            await agent
                .post('/user/reset/password')
                .send(data)
                .expect(200);
            const user = await findOne({ email: body.email });
            const match = await comparePassword(data.newPassword, user.password);
            assert(!match.error);
        });
    });
});
