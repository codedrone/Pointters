const { create: createCategory } = require('../../../stores/category');

module.exports = async(ctx) => {
    const categoryToCreate = Object.assign({
        userId: ctx.state.user.id,
    },
    ctx.request.body
    );
    const category = await createCategory(categoryToCreate);

    if (category.error) ctx.throw(404, category.error.message);

    ctx.body = { success: true, category };
};
