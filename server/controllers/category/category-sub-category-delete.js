const {subCategory:{ pull: pullCategory }} = require('../../../stores/category');

module.exports = async (ctx) => {
    const query = {_id: ctx.params.idCategory};
    const subCategories = await pullCategory(query, ctx.params.idSubCategory);

    if (subCategories.error) ctx.throw(404, subCategories.error.message);

    ctx.body = { success: true };
};
