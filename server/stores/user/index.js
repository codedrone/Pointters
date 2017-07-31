const bcrypt = require('bcrypt');
const client = require('./user-client');
const save = (arg) => client.create(arg);
const findOne = (query) => client.findOne(query).exec();
const comparePassword = (user, passw) => new Promise((resolve) => {
    bcrypt.compare(passw, user.password, (error, isMatch) => {
        if (error) return resolve({ error });
        resolve({ isMatch });
    });
});

const remove = (query) => client.remove(query).exec();

module.exports = { remove, save, findOne, comparePassword };
