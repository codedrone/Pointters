const catchingErrorFromPromise = require('../../../../lib/catching-error-from-promise');

const { isArray } = Array;

module.exports = (client) => (query, _subCategories) => {
    console.log('query ', query);
    const subCategories = isArray(_subCategories) ? _subCategories : [ _subCategories ];
    const update = {
        $pull: {
            "subCategories": { $in: subCategories }
        }
    };
    return catchingErrorFromPromise(client.update(query, update).exec());
};
