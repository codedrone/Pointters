const { create: createCategory } = require('../../../stores/category');

const errorMessage = 'Not found';
module.exports = async(ctx) => {
    const categoryToCreate = Object.assign({
        userId: ctx.state.user.id,
    },
    ctx.request.body
    );
    const category = await createCategory(categoryToCreate);

    if (!category || category.error) ctx.throw(404, errorMessage);

    ctx.body = { success: true, category };
};
