const signToken = require('../../../lib/sign-token');
const { comparePassword } = require('../../../../stores/user');
const messageUserNotFound = 'Authentication failed. User not found.';
const messageAuthenticationFailed = 'Authentication failed. Wrong password.';
const getHeaders = require('../../../lib/get-headers');
const getSession = require('../../../lib/get-session');

module.exports = async(user, password, ctx) => {
    if (!user) {
        ctx.body = { success: false, msg: messageUserNotFound };
        return;
    }
    const { isMatch, error } = await comparePassword(user.password, password);
    if (!isMatch && error) {
        ctx.body = { success: false, msg: messageAuthenticationFailed };
        return;
    }
    const token = signToken({ id: user._id, email: user.email });
    ctx.status = 200;
    ctx.response.set(getHeaders());
    ctx.session = getSession(user);
    ctx.body = { success: true, token: token };
};
