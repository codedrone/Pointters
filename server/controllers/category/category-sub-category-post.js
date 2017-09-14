const { subCategory:{push: pushCategory} } = require('../../../stores/category');

module.exports = async(ctx) => {
    const query = {
        userId: ctx.state.user.id,
        _id: ctx.params.idCategory
    };
    const {subCategories,error} = await pushCategory(query, ctx.request.body);

    if (error) ctx.throw(404, error.message);

    ctx.body = { success: true, subCategories };
};
