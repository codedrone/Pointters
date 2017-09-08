const catchingErrorFromPromise = require('../../../../lib/catching-error-from-promise');

module.exports = (client) => async(query, subCategory) => catchingErrorFromPromise(
    client.update(query, {
        $push:{subCategories: subCategory}
    })
);
