const {subCategory:{ put: putCategory }} = require('../../../stores/category');

module.exports = async (ctx) => {
    const categoryToupdate = ctx.request.body;
    const query = {
        '_id': ctx.params.idCategory,
        'subCategories._id': ctx.params.idSubCategory
    };
    const category = await putCategory(query, categoryToupdate);

    if (!category || category.error) ctx
        .throw(404, category.error ? category.error.message : 'Not found');

    ctx.body = { success: true, subCategories : category.subCategories};
};
