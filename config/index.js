
const development = require('./environments/development');
const production = require('./environments/production');

const isProduction = !process.env.NODE_ENV === 'PROD';
let environment = null;

const defaultConfig = {
    urlToValidateTokenFacebook: 'https://graph.facebook.com/me/?access_token=XYZ'
};
if (isProduction) environment = production;
environment = environment || development;

module.exports = Object.assign(defaultConfig, environment);
