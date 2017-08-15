const mongo = require('../../databases/mongo');
const Schema = mongo.Schema;
const schema = require('./schema');
const serviceSchema = new Schema(schema);

serviceSchema.index({ userId: 1 });
module.exports = mongo.model('service', serviceSchema);
