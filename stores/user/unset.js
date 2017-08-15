const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');

module.exports = (client) => (query = {}, data = {}) => {
    console.log('query   ', query);
    console.log('data   ', data);
    return catchingErrorFromPromise(
    client
        .update(query, { $unset: data })
        .exec()
);
};
