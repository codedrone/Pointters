const { unset } = require('../../../stores/user');

module.exports = async (ctx) => {
    const userId = ctx.state.user.id;
    const settings = ctx.request.body.fields.reduce((set, field) => {
        set[`settings.${field}`] = '';
        return set;
    }, {});
    console.log('user.settings  ', settings);
    const updated = await unset({ _id: userId }, settings);
    console.log('update = ', updated);
    ctx.status = 200;
    ctx.body = { success: true };
};
