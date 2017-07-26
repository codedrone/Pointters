
const development = require('./environments/development');
const production = require('./environments/production');

const isProduction = !process.env.NODE_ENV === 'PROD';

module.exports = () => {
    if (isProduction) return production;
    return development;
};
