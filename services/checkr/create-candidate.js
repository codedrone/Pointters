
const callAPI = require('./client');
const snakify = require('./snakify');
const validateData = require('./validate-candidate');
const uri = '/candidate';
const method = 'POST';
const options = { uri, method };
module.exports = async(data) => {

    const dataSnakify = snakify(data);
    const { error, value: dataValidated } = validateData(dataSnakify);

    if (error) return { error };

    options.json = dataValidated;
    return await callAPI(options);
};
