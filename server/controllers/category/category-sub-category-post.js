const { subCategory:{push: pushCategory} } = require('../../../stores/category');

module.exports = async(ctx) => {
    const query = {
        userId: ctx.state.user.id,
        _id: ctx.params.idCategory
    };
    const category = await pushCategory(query, ctx.request.body);
    console.log('category ', category);
    const {subCategories, error} = category;
    if (error) ctx.throw(404, error.message);

    ctx.body = { success: true, subCategories };
};
