const catchingErrorFromPromise = require('../../../lib/catching-error-from-promise');

const { isArray } = Array;

module.exports = (client) => (query, _medias) => {
    const medias = isArray(_medias) ? _medias : [ _medias ];
    const update = {
        $pull: {
            media: { $in: medias }
        }
    };
    return catchingErrorFromPromise(client.update(query, update).exec());
};
