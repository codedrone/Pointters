const { create } = require('../../../stores/user');
const signToken = require('../../lib/sign-token');
const getHeaders = require('../../lib/get-headers');
const getSession = require('../../lib/get-session');


const successMessage = 'Successful created a new user.';
module.exports = async (ctx) => {
    const savedUser = await create({
        email: ctx.request.body.email,
        password: ctx.request.body.password
    });
    const token = signToken({ id: savedUser._id, email: savedUser.email });
    ctx.response.set(getHeaders());
    ctx.session = getSession(savedUser);
    ctx.body = { success: true, id: savedUser._id, msg: successMessage, token: token };
};

