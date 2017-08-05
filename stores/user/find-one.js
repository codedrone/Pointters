module.exports = (client) => (query) => client.findOne(query).exec()
    .then((_res) => {
        if (!_res) return _res;
        const res = _res.toObject();
        if (res._id) res._id = res._id.toString();
        return res;
    });
