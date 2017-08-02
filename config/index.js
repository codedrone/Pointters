
const development = require('./environments/development');
const production = require('./environments/production');
const defaultConfig = require('./default');

const isProduction = !process.env.NODE_ENV === 'PROD';
let environment = {};

if (isProduction) environment = production;
else environment = development;

module.exports = Object.assign(defaultConfig, environment);

