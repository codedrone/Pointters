const catchingErrorFromPromise = require('../../../lib/catching-error-from-promise');

const { isArray } = Array;

module.exports = (client) => (query, _likes) => {
    const likes = isArray(_likes) ? _likes : [ _likes ];
    const update = {
        $addToSet: {
            likes: {
                $each: likes
            }
        }
    };
    return catchingErrorFromPromise(client.findOneAndUpdate(query, update).exec());
};

