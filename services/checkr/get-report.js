
const callAPI = require('./client');
const uri = '/reports';
const method = 'GET';
const options = { uri, method };

module.exports = async (candidateId) => {
    options.uri = `/reports/${candidateId}`;
    return await callAPI(options);
};
