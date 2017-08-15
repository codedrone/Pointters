const client = require('./client');
const findOne = require('./find-one');
const create = require('./create');
const comparePassword = require('./compare-password');
const remove = require('./remove');
const updateIfExistsAndCreateIfNot = require('./update-if-exists-create-if-not');
const update = require('./update');
const Delete = require('./delete');
const unset = require('./unset');

module.exports = {
    comparePassword,
    unset: unset(client),
    findOne: findOne(client),
    delete: Delete(client),
    create: create(client),
    update: update(client),
    remove: remove(client),
    updateIfExistsAndCreateIfNot: updateIfExistsAndCreateIfNot(client)
};
