const { remove: removeCategory } = require('../../../stores/category');

const errorMessage = 'Request does not exists';
module.exports = async(ctx) => {
    console.log('ctx.params.idCategory in delete', ctx.params.idCategory);
    const categoryRemoved = await removeCategory({ _id: ctx.params.idCategory });
    console.log('categoryRemoved', categoryRemoved);
    if (!categoryRemoved || categoryRemoved.error) ctx.throw(400, errorMessage);

    ctx.body = { success: Boolean(categoryRemoved.ok) };
};
