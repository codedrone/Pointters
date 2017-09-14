const catchingErrorFromPromise = require('../../../../lib/catching-error-from-promise');

module.exports = (client) => async(query, subCategory) => catchingErrorFromPromise(
    client.findOneAndUpdate(query, {
        $push:{subCategories: subCategory}
    })
);
