module.exports = (client) => (query = {}, data = {}, options = {}) => client
    .update(query, { $set: data }, options).exec();
