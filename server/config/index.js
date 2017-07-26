
const development = require('./environments/development');
const production = require('./environments/production');

const isDevelopment = process.env.NODE_ENV === 'test' || (/dev/).test(process.env.NODE_ENV);

module.exports = () => {
    if (isDevelopment) return development;
    return production;
};
