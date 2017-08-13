const catchingErrorFromPromise = require('../../../lib/catching-error-from-promise');

const { isArray } = Array;

<<<<<<< HEAD:stores/user/likes/push-to-likes.js
module.exports = (client) => (query, _likes) => {
    const likes = isArray(_likes) ? _likes : [_likes];
=======
module.exports = (client) => (query, _likesPost) => {
    console.log('query = ', query);
    const likesPost = isArray(_likesPost) ? _likesPost : [ _likesPost ];
    console.log('likesPost = ', likesPost);
>>>>>>> test are foxed:stores/user/likesPost/push-to-likes-post.js
    const update = {
        $addToSet: {
            likes: {
                $each: likes
            }
        }
    };
    return catchingErrorFromPromise(client.update(query, update).exec());
};

