const mongo = require('../../databases/mongo');
const Schema = mongo.Schema;
const schema = require('./schema');
const serviceSchema = new Schema(schema);

<<<<<<< HEAD
module.exports = mongo.model('post-comment', serviceSchema);
=======

module.exports = mongo.model('service', serviceSchema);
>>>>>>> the post and comment store is added
