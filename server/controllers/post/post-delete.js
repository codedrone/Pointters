const { remove: removePost } = require('../../../stores/post');

const errorMessage = 'Post does not exists';
module.exports = async(ctx) => {
    console.log('ctx.params.idPost ', ctx.params.idPost);
    const postRemoved = await removePost({ _id: ctx.params.idPost });
    console.log('postRemoved', postRemoved);
    if (!postRemoved || postRemoved.error) ctx.throw(400, errorMessage);

    ctx.body = { success: Boolean(postRemoved.ok) };
};
