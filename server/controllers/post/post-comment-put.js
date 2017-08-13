const { update: updateComment } = require('../../../stores/post-comment');
const { findOne: findOnePost } = require('../../../stores/post');

const errorMessage = 'Post does not exists';
module.exports = async(ctx) => {
    console.log(' ctx.params.idPost ===', ctx.params.idPost);
    const post = await findOnePost({ _id: ctx.params.idPost });

    if (!post || post.error) ctx.throw(400, errorMessage);

    const commentToupdate = ctx.request.body;
    const { error } = await updateComment({ _id: ctx.params.idComment }, commentToupdate);

    if (error) ctx.throw(500, error.message);

    ctx.body = { success: true };
};
