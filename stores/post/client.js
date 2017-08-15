const mongo = require('../../databases/mongo');
const Schema = mongo.Schema;
const schema = require('./schema');
const postSchema = new Schema(schema);

postSchema.index({ userId: 1 });
module.exports = mongo.model('post', postSchema);
