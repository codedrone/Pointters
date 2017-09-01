const callAPI = require('./client');
const uri = '/reports';
const method = 'GET';
const options = { uri, method };

module.exports = async (reportId) => {
    options.uri = `/reports/${reportId}`;
    return await callAPI(options);
};
