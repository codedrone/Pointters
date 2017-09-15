const { subCategory:{push: pushCategory} } = require('../../../stores/category');

module.exports = async(ctx) => {
    const query = {
        userId: ctx.state.user.id,
        _id: ctx.params.idCategory
    };
    const category = await pushCategory(query, ctx.request.body);
    if (!category || category.error) ctx
        .throw(404, category.error ? category.error.message : 'Not found');

    ctx.body = { success: true, subCategories:category.subCategories };
};
