const bcrypt = require('bcrypt');

const client = require('./user-client');

const findOne = (query) => client.findOne(query).exec()
    .then((res) => {
        if (res) return res.toObject();
        return res;
    });
const create = (data) => client.create(data).then((res) => res.toObject());

const comparePassword = (passw, otherPassw) => new Promise((resolve) => {
    bcrypt.compare(otherPassw, passw, (error, isMatch) => {
        if (error) return resolve({ error });
        resolve({ isMatch });
    });
});
const remove = (query) => client.remove(query);
const updateIfExistsAndCreateIfNot = async (query, data) => {
    await client.update(query, { $set: data }, { upsert: true, new: true });
    const updatedOrCreated = await client.find(query).exec();
    return updatedOrCreated.map((item) => item.toObject());
};
const update = (query = {}, data = {}, options = {}) => client.update(query, { $set: data }, options).exec();

module.exports = { findOne, create, update, comparePassword, remove, updateIfExistsAndCreateIfNot };
