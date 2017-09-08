const {subCategory:{ get: getCategory }} = require('../../../stores/category');

module.exports = async (ctx) => {
    const categoryToupdate = ctx.request.body;
    const query = {
        '_id': ctx.params.idCategory,
        'subCategories._id': ctx.params.idSubCategory
    };
    const subCategories = await getCategory(query, categoryToupdate);

    if (subCategories.error) ctx.throw(404, subCategories.error.message);

    ctx.body = { success: true, subCategories };
};
