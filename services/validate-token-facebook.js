const request = require('request');

const parseBody = require('../lib/parse-body');

const { urlToValidateTokenFacebook } = require('../config');

module.exports = (token) => new Promise((resolve, reject) => {
    const qs = { access_token: token };
    const options = {
        uri: urlToValidateTokenFacebook,
        qs
    };

    request.get(options, (err, res) => {
        if (err) return reject(err);
        const body = parseBody(res.body);
        resolve(body);
    });
});


