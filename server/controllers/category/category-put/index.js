const { update: updateCategory } = require('../../../../stores/category');
const getQuery = require('./get_query');
const getUpdate = require('./get-update');

const errorMessage = 'Category not found';
module.exports = async (ctx) => {
    const query = getQuery(ctx);
    const update = getUpdate(ctx);
    const category = await updateCategory(query, update);

    if (!category || category.error) ctx.throw(404, errorMessage);

    ctx.body = { success: true };
};
