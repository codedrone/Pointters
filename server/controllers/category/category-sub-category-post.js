const { subCategory:{push: pushCategory} } = require('../../../stores/category');

module.exports = async(ctx) => {
    const query = {
        userId: ctx.state.user.id,
        _id: ctx.params.idCategory
    };
    const category = await pushCategory(query, ctx.request.body);

    if (category.error) ctx.throw(404, category.error.message);

    ctx.body = { success: true, category };
};
