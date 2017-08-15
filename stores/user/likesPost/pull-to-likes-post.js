const catchingErrorFromPromise = require('../../../lib/catching-error-from-promise');

const { isArray } = Array;

module.exports = (client) => (query, _likesPost) => {
    const likesPost = isArray(_likesPost) ? _likesPost : [ _likesPost ];
    const update = {
        $pull: {
            likesPost: { $in: likesPost }
        }
    };
    return catchingErrorFromPromise(client.update(query, update).exec());
};
