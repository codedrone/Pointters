
const callAPI = require('./client');
const validateData = require('./validate-candidate');
const uri = '/candidate';
const method = 'POST';
const options = { uri, method };

module.exports = async(data) => {
    const { error, value: dataValidated } = validateData(data);

    if (error) return { error };

    options.json = dataValidated;
    return await callAPI(options);
};