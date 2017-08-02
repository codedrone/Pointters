const { update, findOne } = require('../../../stores/user');
const { optExpiresIn, longOfPasswordTemp } = require('../../../config');
module.exports = async(ctx) => {
    const queryToFindUser = { email: ctx.request.body.email };
    const user = await findOne(queryToFindUser);

    if (!user) return ctx.throw(404, 'User not found');

    const updateTheAuthSettings = {
        tempPassword: Math.random().toString(36).slice(-longOfPasswordTemp),
        resetPasswordExpires: new Date(Date.now() + optExpiresIn)
    };
    ctx.body = updateTheAuthSettings;
    await update(queryToFindUser, updateTheAuthSettings);
};
