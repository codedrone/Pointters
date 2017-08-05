module.exports = (client) => (data) => client.create(data)
    .then((_res) => {
        if (!_res) return _res;
        const res = _res.toObject();
        if (res._id) res._id = res._id.toString();
        return res;
    });
