const signToken = require('../../../lib/sign-token');
const { comparePassword } = require('../../../../stores/user');
const messageUserNotFound = 'Authentication failed. User not found.';
const messageAuthenticationFailed = 'Authentication failed. Wrong password.';

module.exports = async (user, password, ctx) => {
    if (!user) {
        ctx.body = { success: false, msg: messageUserNotFound };
        return;
    }
    console.log('user, password', user, password);

    const { isMatch, error } = await comparePassword(user, password);
    console.log('isMatch, error', isMatch, error);
    if (isMatch && !error) {
        const token = signToken({ id: user._id, email: user.email });
        ctx.status = 200;
        ctx.body = { success: true, token: token };
        return;
    }
    ctx.body = { success: false, msg: messageAuthenticationFailed };
};
