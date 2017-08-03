const bcrypt = require('bcrypt');
const client = require('./user-client');

const findOne = (query) => client.findOne(query).exec()
    .then((_res) => {
        if (!_res) return _res;
        const res = _res.toObject();
        if (res._id) res._id = res._id.toString();
        return res;
    });
const create = (data) => client.create(data)
    .then((_res) => {
        if (!_res) return _res;
        const res = _res.toObject();
        if (res._id) res._id = res._id.toString();
        return res;
    });

const comparePassword = (passw, hash) => bcrypt.compare(passw, hash);
const remove = (query) => client.remove(query);
const updateIfExistsAndCreateIfNot = async(query, data) => client
    .update(query, { $set: data }, { upsert: true, new: true })
    .then((updatedOrCreated) => updatedOrCreated.map((item) => item.toObject()))
    .then((updatedOrCreated) => updatedOrCreated.map((item) => {
        if (item._id) item._id = item._id.toString();
        return item;
    }));

const update = (query = {}, data = {}, options = {}) => client
    .update(query, { $set: data }, options).exec();
const unset = (query = {}, data = {}, options = {}) => client
    .update(query, { $unset: data }, options).exec();

module.exports = {
    unset,
    findOne,
    create,
    update,
    comparePassword,
    remove,
    updateIfExistsAndCreateIfNot
};
