module.exports = (client) => (query = {}, data = {}, options = {}) => client
    .update(query, { $unset: data }, options).exec();
