const schema = require('./schema');
const get = require('./get-media');
const put = require('./put-media');
const pull = require('./pull-media');


module.exports = {
    schema,
    methods:(client) => ({
        get: get(client),
        put: put(client),
        pull: pull(client),
    })
};
