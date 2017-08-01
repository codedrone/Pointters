const { save: saveUser } = require('../../../stores/user');
const signToken = require('../../lib/sign-token');
const { rateLimit, jwt: { expiresIn } } = require('../../../config');


const successMessage = 'Successful created a new user.';
const failedMessage = 'User can not be singup';
module.exports = async(ctx) => {
    const savedUser = await saveUser({
        email: ctx.request.body.email,
        password: ctx.request.body.token
    })
        .catch((error) => ({ error }));
    if (savedUser.error) {
        ctx.body = { success: false, msg: failedMessage };
        return;
    }
    const token = signToken(savedUser._id, savedUser.email);
    const tokenExpiresIn = new Date(Date.now() + expiresIn).toString();
    const headers = {
        'X-Rate-Limit': rateLimit,
        'X-Expires-After': tokenExpiresIn
    };
    ctx.response.set(headers);
    ctx.body = { success: true, id: savedUser._id, msg: successMessage, token: token };
};

