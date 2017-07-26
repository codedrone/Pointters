const client = require('./user-client');
const save = (arg) => client.create(arg);
const findOne = (query) => client.findOne(query).exec();


module.exports = {save, findOne};
