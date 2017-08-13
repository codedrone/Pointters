const client = require('./client');
const findOne = require('./find-one');
const create = require('./create');
const remove = require('./remove');
const updateIfExistsAndCreateIfNot = require('./update-if-exists-create-if-not');
const update = require('./update');
<<<<<<< HEAD
const Delete = require('./delete');
=======
>>>>>>> the post and comment store is added
const unset = require('./unset');

module.exports = {
    unset: unset(client),
    findOne: findOne(client),
<<<<<<< HEAD
    delete: Delete(client),
=======
>>>>>>> the post and comment store is added
    create: create(client),
    update: update(client),
    remove: remove(client),
    updateIfExistsAndCreateIfNot: updateIfExistsAndCreateIfNot(client)
};
