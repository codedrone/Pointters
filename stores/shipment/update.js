const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');

module.exports = (client) => (query = {}, data = {}, options = {new:true}) => {
    data.updatedAt = new Date();
    return catchingErrorFromPromise(
        client.findOneAndUpdate(query, { $set: data }, options).exec() .then((res) => res && res.toObject ? res.toObject() : res)
            .then((res) => {
                console.log('res = ', res);
                return res && res.toObject ? res.toObject() : res;
            })
    );
};
