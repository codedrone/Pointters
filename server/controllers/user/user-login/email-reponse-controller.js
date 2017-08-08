const signToken = require('../../../lib/sign-token');
const { comparePassword } = require('../../../../stores/user');
const messageUserNotFound = 'Authentication failed. User not found.';
const messageAuthenticationFailed = 'Authentication failed. Wrong password.';
const getHeaders = require('../../../lib/get-headers');
const getSession = require('../../../lib/get-session');

module.exports = async(user, password, ctx) => {
    if (!user || user.error) {
        ctx.body = { success: false, msg: messageUserNotFound };
        return;
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) ctx.throw(401, messageAuthenticationFailed);
    const token = signToken({ id: user._id });
    ctx.status = 200;
    ctx.response.set(getHeaders());
    ctx.session = getSession(user);

    ctx.body = { success: true, token: token };
};
