
const development = require('./environments/development');
const production = require('./environments/production');

const isProduction = !process.env.NODE_ENV === 'PROD';
let environment = null;

if (isProduction) environment = production;
environment = environment || development;

module.exports = environment;
