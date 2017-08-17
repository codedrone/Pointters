const mongoosastic = require('mongoosastic');

module.exports = (model) => model.plugin(mongoosastic);

