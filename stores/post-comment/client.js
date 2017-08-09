const mongo = require('../../databases/mongo');
const Schema = mongo.Schema;
const schema = require('./schema');
const serviceSchema = new Schema(schema);

module.exports = mongo.model('post-comment', serviceSchema);
