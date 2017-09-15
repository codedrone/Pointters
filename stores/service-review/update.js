const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');

module.exports = (client) => (query = {}, data = {}, options = {new:true}) => catchingErrorFromPromise(
    client
        .update(query, { $set: data }, options).exec()
);
