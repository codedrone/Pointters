const request = require('request');

const parseBody = require('../../lib/parse-body');
const { checkr: { authToken } } = require('../../config');
const auth = {
    user: authToken,
    password: ''
};
const baseUrl = ' https://api.checkr.com/v1';
const defaultOptiosn = { auth, baseUrl };

module.exports = (options = {}) => new Promise((resolve, reject) => {
    const optionsWithDefaultAttached = Object.assign(defaultOptiosn, options);
    request(optionsWithDefaultAttached, (err, { error, body }) => {
        if (err) return reject(err);

        if (error) return resolve({ error });

        resolve(parseBody(body));
    });
});
