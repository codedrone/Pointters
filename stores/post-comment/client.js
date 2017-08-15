const mongo = require('../../databases/mongo');
const Schema = mongo.Schema;
const schema = require('./schema');
const commentSchema = new Schema(schema);


commentSchema.index({ userId: 1 });
commentSchema.index({ commentId: 1 });
commentSchema.index({ commentId: 1, userId: 1 });
module.exports = mongo.model('post-comment', commentSchema);
