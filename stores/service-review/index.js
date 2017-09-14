const client = require('./client');
const findOne = require('./find-one');
const find = require('./find');
const create = require('./create');
const remove = require('./remove');
const updateIfExistsAndCreateIfNot = require('./update-if-exists-create-if-not');
const update = require('./update');
const count = require('./count');
const search = require('./search');
const unset = require('./unset');

module.exports = {
    unset: unset(client),
    findOne: findOne(client),
    find: find(client),
    count: count(client),
    create: create(client),
    search: search(client),
    update: update(client),
    remove: remove(client),
    updateIfExistsAndCreateIfNot: updateIfExistsAndCreateIfNot(client)
};
