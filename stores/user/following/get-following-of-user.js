const catchingErrorFromPromise = require('../../../lib/catching-error-from-promise');

module.exports = (client) => (query) => {
    try {
        return catchingErrorFromPromise(
            client.findOne(query).populate().exec()
            .then((_res) => {
                if (!_res) return _res;
                return _res.toObject().following || [];
            }));
    } catch (error) {
        return {error};
    }
};


