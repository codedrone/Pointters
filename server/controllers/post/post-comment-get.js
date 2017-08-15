const { findOne: findOneComment } = require('../../../stores/post-comment');

const errorInGetWatching = 'Error in get to post-comment';
const commentDoesNotExists = 'Error in get to post-comment';

module.exports = async(ctx) => {
    const queryToFindComment = { _id: ctx.params.idComment };
    console.log('queryToFindComment ', queryToFindComment);
    const postComment = await findOneComment(queryToFindComment);

    if (!postComment) ctx.throw(403, commentDoesNotExists);

    if (postComment.error) ctx.throw(500, errorInGetWatching);

    ctx.body = {
        comment: postComment
    };
};
