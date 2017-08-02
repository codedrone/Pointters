const { update, findOne, comparePassword } = require('../../../stores/user');
const signToken = require('../../lib/sign-token');
const getHeaders = require('../../lib/get-headers');
const getSession = require('../../lib/get-session');

module.exports = async(ctx) => {
    const queryToFindUser = { email: ctx.request.body.email };
    const user = await findOne(queryToFindUser);
    const isMatch = await comparePassword(ctx.request.body.oldPassword, user.tempPassword);
    const isValidToResetTheUser = user &&
        new Date() < new Date(user.resetPasswordExpires) &&
        isMatch;

    if (!isValidToResetTheUser) return ctx.throw(400, 'The password not valid');

    const updateTheAuthSettings = {
        password: ctx.request.body.newPassword,
        resetPasswordExpires: null,
        tempPassword: null
    };
    await update(queryToFindUser, updateTheAuthSettings);
    const token = signToken({ id: user._id, email: user.email });
    ctx.response.set(getHeaders());
    ctx.session = getSession(user);
    ctx.status = 200;
    ctx.body = { success: true, token: token };
};
