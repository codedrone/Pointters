const mongo = require('../../databases/mongo');
const Schema = mongo.Schema;
const schema = require('./schema');
const reviewSchema = new Schema(schema);

reviewSchema.index({ userId: 1 });
reviewSchema.index({ serviceId: 1 });
module.exports = mongo.model('service-review', reviewSchema);
