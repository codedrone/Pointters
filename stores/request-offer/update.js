const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');

module.exports = (client) => (query = {}, data = {}, options = {}) => {
    data.updatedAt = new Date();
    return catchingErrorFromPromise(
    client.update(query, { $set: data }, options).exec());
};
