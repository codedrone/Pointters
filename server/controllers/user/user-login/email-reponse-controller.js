const signToken = require('../../../lib/sign-token');
const { comparePassword } = require('../../../../stores/user');
const messageUserNotFound = 'Authentication failed. User not found.';
const messageAuthenticationFailed = 'Authentication failed. Wrong password.';
const { rateLimit, jwt: { expiresIn } } = require('../../../../config');

module.exports = async (user, password, ctx) => {
    if (!user) {
        ctx.body = { success: false, msg: messageUserNotFound };
        return;
    }
    const { isMatch, error } = await comparePassword(user, password);
    console.log('isMatch, error', isMatch, error);
    if (!isMatch && error) {
        ctx.body = { success: false, msg: messageAuthenticationFailed };
        return;
    }
    const token = signToken({ id: user._id, email: user.email });
    ctx.status = 200;
    const tokenExpiresIn = new Date(Date.now() + expiresIn).toString();
    const headers = {
        'X-Rate-Limit': rateLimit,
        'X-Expires-After': tokenExpiresIn
    };
    ctx.response.set(headers);
    ctx.session = {
        id: user._id,
        email: user.email
    };
    ctx.body = { success: true, token: token };
};
