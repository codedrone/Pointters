const { findOne: findOne } = require('../../../stores/post-comment');
const { findOne: findOnePost } = require('../../../stores/post');

const errorMessage = 'Post does not exists';
const errorInGetWatching = 'Error in get to post-comment';
const commentDoesNotExists = 'Error in get to post-comment';

module.exports = async(ctx) => {
    console.log('ctx.params.idPost', ctx.params.idPost);
    const post = await findOnePost({ _id: ctx.params.idPost });

    if (!post || post.error) ctx.throw(400, errorMessage);
    const queryToFindComment = { _id: ctx.params.idComment };
    console.log('queryToFindComment ', queryToFindComment);
    const postComment = await findOne(queryToFindComment);

    if (!postComment) ctx.throw(403, commentDoesNotExists);

    if (postComment.error) ctx.throw(500, errorInGetWatching);

    ctx.body = {
        comment: postComment
    };
};
