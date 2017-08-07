const { update, findOne } = require('../../../stores/user');
const { optExpiresIn, longOfPasswordTemp } = require('../../../config');
const errorInUpdateUser = 'Error on update user'

module.exports = async (ctx) => {
    const queryToFindUser = { email: ctx.request.body.email };
    const user = await findOne(queryToFindUser);

    if (!user || user.error) return ctx.throw(404, 'User not found');

    const updateTheAuthSettings = {
        tempPassword: Math.random().toString(36).slice(-longOfPasswordTemp),
        resetPasswordExpires: new Date(Date.now() + optExpiresIn)
    };
    ctx.body = updateTheAuthSettings;
    const { error } = await update(queryToFindUser, updateTheAuthSettings);

    if (error) ctx.throw(500, errorInUpdateUser);
};
