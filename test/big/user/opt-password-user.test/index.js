const assert = require('assert');
const features = require('./features');
const { findOne, create: createUser } = require('../../../../stores/user');
const {
    emailSenderingCong:{
        emailRemitentInOpt,
        subjectOptEmail: subject,
        contentOptEmail: content
    }
} = require('../../../../config');

describe('Reset the password using temporal password', () => {
    describe('SUCCESS', () => {
        it('/user/opt POST -> should reset the password', async() => {
            const body = {
                email: 'test_opt_pass@test.com',
                password: 'test_opt',
            };
            features(emailRemitentInOpt, body.email, subject, content);
            await createUser(body);
            const data = {
                email: body.email
            };
            await agent
                .post('/user/opt')
                .set(authorizationHeader)
                .set(Cookie)
                .send(data)
                .expect(200);
            const query = {
                email: body.email,
                tempPassword: { $exists: true },
                resetPasswordExpires: { $exists: true }
            };
            const _user = await findOne(query);
            assert(_user);
        });
    });
});
