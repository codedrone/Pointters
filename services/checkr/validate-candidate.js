const joi = require('joi');

console.log('joi', joi);
const schema = require('./schema-candidate');

console.log('schema =', schema);
module.exports = (data) => joi.validate(data, schema);

