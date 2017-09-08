const { update: updateCategory } = require('../../../../stores/category');
const getQuery = require('./get_query');
const getUpdate = require('./get-update');
module.exports = async (ctx) => {
    const query = getQuery(ctx);
    const update = getUpdate(ctx);
    const { error } = await updateCategory(query, update);

    if (error) ctx.throw(404, error.message);

    ctx.body = { success: true };
};
