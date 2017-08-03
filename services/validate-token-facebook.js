const Fb = require('fb');

const { facebook } = require('../config');

const fb = new Fb.Facebook(facebook);


module.exports = async (token) => {
    fb.setAccessToken(token);
    return await fb.api('/me').catch((error) => ({ error }));
};
