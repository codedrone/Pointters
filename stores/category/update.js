const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');

module.exports = (client) => (query = {}, data = {}, options = {}) => {
    data.updatedAt = new Date();
    return catchingErrorFromPromise(client.findOneAndUpdate(query, { $set: data }, options).exec());
};
