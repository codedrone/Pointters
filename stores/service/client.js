const mongo = require('../../databases/mongo');
const addSyncHook = require('../../lib/sync-elasticsearch-hook');
const schema = require('./schema');
const addIndex = require('./plugin/add-index');
const Schema = mongo.Schema;
const serviceSchema = new Schema(schema);
addSyncHook(serviceSchema);
addIndex(serviceSchema);
const Service = mongo.model('service', serviceSchema);

module.exports = Service;
