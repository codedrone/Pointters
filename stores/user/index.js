const bcrypt = require('bcrypt');

const client = require('./user-client');

const save = (arg) => client.create(arg);
const findOne = (query) => client.findOne(query).exec()
    .then((res) => {
        if (res) return res.toObject();
        return res;
    });
const create = (data) => client.create(data).then((res) => res.toObject());

const comparePassword = (user, passw) => new Promise((resolve) => {
    console.log('user ===', user, passw);
    bcrypt.compare(passw, user.password, (error, isMatch) => {
        if (error) return resolve({ error });
        resolve({ isMatch });
    });
});
const remove = (query) => client.remove(query);

const update = (query = {}, data = {}, options = {}) => client.update(query, { $set: data }, options);
module.exports = { save, findOne, create, update, comparePassword, remove };
