const mongo = require('../../databases/mongo');
const addSyncHook = require('../../lib/sync-elasticsearch-hook');
const schema = require('./schema');
const addIndex = require('./plugin/add-index');
const Schema = mongo.Schema;
const offerSchema = new Schema(schema);
addSyncHook(offerSchema);
addIndex(offerSchema);
const offer = mongo.model('request-offer', offerSchema);

module.exports = offer;
