const { unset } = require('../../../stores/user');

const errorMessageInRemoveSetting = 'Error in remove settings';

module.exports = async (ctx) => {
    const settings = ctx.request.body.fields.reduce((set, field) => {
        set[`settings.${field}`] = '';
        return set;
    }, {});
    const userToremoveSettings = ctx.queryToFindUserById;
    const { error } = await unset(userToremoveSettings, settings);

    if (error) ctx.throw(500, errorMessageInRemoveSetting);

    ctx.status = 200;
    ctx.body = { success: true };
};
