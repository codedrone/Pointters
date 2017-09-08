const {subCategory:{ put: putCategory }} = require('../../../stores/category');

module.exports = async (ctx) => {
    const categoryToupdate = ctx.request.body;
    const query = {
        '_id': ctx.params.idCategory,
        'subCategories._id': ctx.params.idSubCategory
    };
    const { error } = await putCategory(query, categoryToupdate);

    if (error) ctx.throw(404, error.message);

    ctx.body = { success: true };
};
