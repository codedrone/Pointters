const bcrypt = require('bcrypt');

const client = require('./user-client');

const findOne = (query) => client.findOne(query).exec()
    .then((res) => {
        if (res) return res.toObject();
        return res;
    });
const create = (data) => client.create(data).then((res) => res.toObject());

const comparePassword = (passw, hash) => bcrypt.compare(passw, hash);
const remove = (query) => client.remove(query);
const updateIfExistsAndCreateIfNot = async (query, data) => {
    await client.update(query, { $set: data }, { upsert: true, new: true });
    const updatedOrCreated = await client.find(query).exec();
    return updatedOrCreated.map((item) => item.toObject());
};
const update = (query = {}, data = {}, options = {}) => client.update(query, { $set: data }, options).exec();
const unset = (query = {}, data = {}, options = {}) => client.update(query, { $unset: data }, options).exec();

module.exports = {
    unset,
    findOne,
    create,
    update,
    comparePassword,
    remove,
    updateIfExistsAndCreateIfNot
};
