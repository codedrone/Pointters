const catchingErrorFromPromise = require('../../lib/catching-error-from-promise');

module.exports = (client) => (data) => {
    console.log('data ===', data);
    return catchingErrorFromPromise(
        client.create(data)
            .then((_res) => {
                if (!_res) return _res;
                const res = _res.toObject();
                if (res._id) res._id = res._id.toString();
                return res;
            }));
};
