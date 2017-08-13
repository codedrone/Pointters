const catchingErrorFromPromise = require('../../../lib/catching-error-from-promise');

const { isArray } = Array;

<<<<<<< HEAD:stores/user/likes/pull-to-likes.js
module.exports = (client) => (query, _likes) => {
    const likes = isArray(_likes) ? _likes : [_likes];
=======
module.exports = (client) => (query, _likesPost) => {
    console.log(' query to pull', query);
    const likesPost = isArray(_likesPost) ? _likesPost : [_likesPost];
    console.log('likesPost', likesPost);
>>>>>>> test are foxed:stores/user/likesPost/pull-to-likes-post.js
    const update = {
        $pull: {
            likes: { $in: likes }
        }
    };
    return catchingErrorFromPromise(client.update(query, update).exec());
};
