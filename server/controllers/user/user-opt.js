const { update, findOne } = require('../../../stores/user');

const { email: { sendEmail } } = require('../../../services');
const { optExpiresIn,
    longOfPasswordTemp,
    emailSenderingCong: {
        subjectOptEmail: subject,
        contentOptEmail: _content
    }
} = require('../../../config');

const errorInUpdateUser = 'Error on update user';

module.exports = async(ctx) => {
    const queryToFindUser = { email: ctx.request.body.email };
    const user = await findOne(queryToFindUser);

    if (!user || user.error) return ctx.throw(404, 'User not found');

    const updateTheAuthSettings = {
        tempPassword: Math.random().toString(36).slice(-longOfPasswordTemp),
        resetPasswordExpires: new Date(Date.now() + optExpiresIn)
    };
    const error = await update(queryToFindUser, updateTheAuthSettings);

    if (error) ctx.throw(404, error.message);

    const content = _content + updateTheAuthSettings.tempPassword;
    const {error: errorInSendEmail} = await sendEmail(user.email, subject, content);

    if (errorInSendEmail) ctx.throw(404, errorInSendEmail.message);
};
