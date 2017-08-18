const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');

module.exports = (client) => (query = {}, data = {}, options = {}) => catchingErrorFromPromise(
    client
        .update(query, { $unset: data }, options)
        .exec()
);
